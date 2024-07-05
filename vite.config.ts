import path from "path";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";

const resolve = {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
};

export default defineConfig({
  plugins: [
    electron({
      main: {
        entry: "electron/main.ts",
        vite: {
          resolve,
        },
      },
      preload: {
        input: "electron/preload.ts",
        vite: {
          resolve,
        },
      },
    }),
  ],
  resolve,
});
