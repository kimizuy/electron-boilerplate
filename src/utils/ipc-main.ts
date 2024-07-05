import { ipcMain as ipcMainPrimitive } from "electron";
import { type AllowedChannel } from "../../electron/preload";

// channel引数を型安全にしたipcMainのラッパー
export const ipcMain = {
  handle: (
    channel: AllowedChannel,
    listener: Parameters<typeof ipcMainPrimitive.handle>[1],
  ): void => {
    ipcMainPrimitive.handle(channel, listener);
  },
  on: (
    channel: AllowedChannel,
    listener: Parameters<typeof ipcMainPrimitive.on>[1],
  ): void => {
    ipcMainPrimitive.on(channel, listener);
  },
  once: (
    channel: AllowedChannel,
    listener: Parameters<typeof ipcMainPrimitive.once>[1],
  ): void => {
    ipcMainPrimitive.once(channel, listener);
  },
  removeListener: (
    channel: AllowedChannel,
    listener: Parameters<typeof ipcMainPrimitive.removeListener>[1],
  ): void => {
    ipcMainPrimitive.removeListener(channel, listener);
  },
  removeAllListeners: (channel: AllowedChannel): void => {
    ipcMainPrimitive.removeAllListeners(channel);
  },
  handleOnce: (
    channel: AllowedChannel,
    listener: Parameters<typeof ipcMainPrimitive.handleOnce>[1],
  ): void => {
    ipcMainPrimitive.handleOnce(channel, listener);
  },
  removeHandler: (channel: AllowedChannel): void => {
    ipcMainPrimitive.removeHandler(channel);
  },
};
