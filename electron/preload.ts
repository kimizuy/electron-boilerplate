import { ipcRenderer, contextBridge } from "electron";

const allowedChannels = ["main-process-message"] as const;

type AllowedChannel = (typeof allowedChannels)[number];

const electronApi = {
  on(
    channel: AllowedChannel,
    listener: Parameters<typeof ipcRenderer.on>[1],
  ): void {
    if (allowedChannels.includes(channel)) {
      ipcRenderer.on(channel, listener);
    } else {
      console.warn(`Channel ${channel} is not allowed`);
    }
  },
  off(
    channel: AllowedChannel,
    listener: Parameters<typeof ipcRenderer.off>[1],
  ): void {
    if (allowedChannels.includes(channel)) {
      ipcRenderer.off(channel, listener);
    } else {
      console.warn(`Channel ${channel} is not allowed`);
    }
  },
  send(
    channel: AllowedChannel,
    ...args: Parameters<typeof ipcRenderer.send>[1]
  ): void {
    if (allowedChannels.includes(channel)) {
      ipcRenderer.send(channel, ...args);
    } else {
      console.warn(`Channel ${channel} is not allowed`);
    }
  },
  async invoke(
    channel: AllowedChannel,
    ...args: Parameters<typeof ipcRenderer.invoke>[1]
  ): ReturnType<typeof ipcRenderer.invoke> {
    if (allowedChannels.includes(channel)) {
      try {
        return await ipcRenderer.invoke(channel, ...args);
      } catch (error) {
        console.error(`Error invoking channel ${channel}:`, error);
        throw error;
      }
    } else {
      console.warn(`Channel ${channel} is not allowed`);
      return Promise.reject(`Channel ${channel} is not allowed`);
    }
  },
};

contextBridge.exposeInMainWorld("electron", electronApi);

declare global {
  interface Window {
    electron: typeof electronApi;
  }
}
