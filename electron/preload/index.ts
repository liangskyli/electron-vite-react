import { contextBridge, ipcRenderer } from 'electron';

const apiKey = 'electronAPI';

const callDllExample = async () => {
  const result = await ipcRenderer.invoke('callDllExample');
  console.log('result:', result);
};
const getCaplockStatus: () => Promise<{
  isSuccess: boolean;
  isCapLock: boolean;
}> = async () => {
  return await ipcRenderer.invoke('getKeyboardCapLockState');
};

const api = {
  versions: process.versions,
  callDllExample: callDllExample,
  getCaplockStatus: getCaplockStatus,
};

contextBridge.exposeInMainWorld(apiKey, api);
