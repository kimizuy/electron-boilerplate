import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { db } from "./utils/db";
import { ipcMainListeners } from "./ipc-main-listeners";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const hono = new Hono();
const port = 3000;

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Load the app
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    void mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    // In production, use Hono server
    const startURL = `http://localhost:${port}`;
    void mainWindow.loadURL(startURL);
  }

  // Open the DevTools when in development mode.
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }
};

void app.whenReady().then(() => {
  const migrationsFolder =
    process.env.NODE_ENV === "development"
      ? "drizzle"
      : path.join(process.resourcesPath, "drizzle");
  migrate(db, { migrationsFolder });

  if (!MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    // Set up Hono server for production
    const distPath = path.join(
      __dirname,
      `../renderer/${MAIN_WINDOW_VITE_NAME}`,
    );

    // Serve static files
    hono.use("/*", serveStatic({ root: distPath }));

    // Start the server
    serve(
      {
        fetch: hono.fetch,
        port,
      },
      createWindow,
    );
  } else {
    createWindow();
  }

  // Register IPC main listeners
  Object.entries(ipcMainListeners).forEach(([channel, listener]) => {
    ipcMain.handle(channel, listener);
  });

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
