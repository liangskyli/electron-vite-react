import { contextBridge } from 'electron';
import { initPreloadLogger } from '../common/logger/preload.ts';
import checkUpdate from './ipc/check-update.ts';
import { getTestHandle1 } from './ipc/test.ts';
import user32 from './ipc/user32.ts';

initPreloadLogger();

const apiKey = 'electronAPI';

const api = {
  versions: process.versions,
  getTestHandle1,
  user32,
  checkUpdate,
};

contextBridge.exposeInMainWorld(apiKey, api);

export type IElectronAPI = typeof api;
