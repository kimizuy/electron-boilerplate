import { type ipcMain } from "electron";
import { getNames } from "./get-names";
import { saveName } from "./save-name";

export const ipcMainListeners = {
  getNames,
  saveName,
};

export type IpcMainListener = Parameters<typeof ipcMain.handle>[1];
