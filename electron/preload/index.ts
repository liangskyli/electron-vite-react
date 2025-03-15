import { contextBridge } from 'electron';
import { getTestHandle1 } from './ipc/test.ts';

const apiKey = 'electronAPI';

const api = {
  versions: process.versions,
  getTestHandle1,
};

contextBridge.exposeInMainWorld(apiKey, api);

export type IElectronAPI = typeof api;
