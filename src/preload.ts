import { ipcRenderer, contextBridge } from "electron";
import { type ipcMainListeners } from "./ipc-main-listeners";

type AllowedChannel = keyof typeof ipcMainListeners;

type InvokeArgs<K extends AllowedChannel> = Parameters<
  (typeof ipcMainListeners)[K]
>[1];

type IsOptional<T> = undefined extends T ? true : false;

const api = {
  invoke: <K extends AllowedChannel>(
    channel: K,
    ...args: IsOptional<InvokeArgs<K>> extends true
      ? [InvokeArgs<K>?]
      : InvokeArgs<K> extends undefined
        ? []
        : [InvokeArgs<K>]
  ): Promise<Awaited<ReturnType<(typeof ipcMainListeners)[K]>>> => {
    return ipcRenderer.invoke(channel, ...args);
  },
};

contextBridge.exposeInMainWorld("ipcRenderer", api);

declare global {
  interface Window {
    ipcRenderer: typeof api;
  }
}
