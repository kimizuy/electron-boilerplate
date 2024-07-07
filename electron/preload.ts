import { ipcRenderer, contextBridge } from "electron";

const allowedChannels = ["perform-heavy-task"] as const;

export type AllowedChannel = (typeof allowedChannels)[number];

const api = {
  on(
    channel: AllowedChannel,
    listener: Parameters<typeof ipcRenderer.on>[1],
  ): void {
    ipcRenderer.on(channel, listener);
  },
  off(
    channel: AllowedChannel,
    listener: Parameters<typeof ipcRenderer.off>[1],
  ): void {
    ipcRenderer.off(channel, listener);
  },
  send(
    channel: AllowedChannel,
    ...args: Parameters<typeof ipcRenderer.send>[1]
  ): void {
    ipcRenderer.send(channel, ...args);
  },
  async invoke(
    channel: AllowedChannel,
    ...args: Parameters<typeof ipcRenderer.invoke>[1]
  ): ReturnType<typeof ipcRenderer.invoke> {
    return await ipcRenderer.invoke(channel, ...args);
  },
};

contextBridge.exposeInMainWorld("electron", api);

declare global {
  interface Window {
    electron: typeof api;
  }
}
