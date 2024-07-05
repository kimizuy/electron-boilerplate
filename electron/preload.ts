import { ipcRenderer, contextBridge } from "electron";

const electronApi = {
  on(
    ...args: Parameters<typeof ipcRenderer.on>
  ): ReturnType<typeof ipcRenderer.on> {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args),
    );
  },
  off(
    ...args: Parameters<typeof ipcRenderer.off>
  ): ReturnType<typeof ipcRenderer.off> {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(
    ...args: Parameters<typeof ipcRenderer.send>
  ): ReturnType<typeof ipcRenderer.send> {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(
    ...args: Parameters<typeof ipcRenderer.invoke>
  ): ReturnType<typeof ipcRenderer.invoke> {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },
};

contextBridge.exposeInMainWorld("electron", electronApi);

declare global {
  interface Window {
    electron: typeof electronApi;
  }
}
