import { contextBridge } from 'electron';
import { initPreloadLogger } from '../common/logger/preload.ts';
import { getTestHandle1 } from './ipc/test.ts';

initPreloadLogger();

const apiKey = 'electronAPI';

const api = {
  versions: process.versions,
  getTestHandle1,
};

contextBridge.exposeInMainWorld(apiKey, api);

export type IElectronAPI = typeof api;
