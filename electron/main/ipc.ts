import { ipcMain } from 'electron';
import { callDllExample, getKeyboardState, keyParam } from './dll/user32.ts';

const initIpcMain = () => {
  ipcMain.handle('callDllExample', async () => {
    callDllExample();
    const result = { code: 'ok' };
    return result;
  });
  ipcMain.handle('getKeyboardCapLockState', async () => {
    const { status, buf } = getKeyboardState();
    let isCapLock = false;
    if (status) {
      isCapLock = buf[keyParam['capslock']] === 1;
    }
    return { isSuccess: status, isCapLock };
  });
};
export { initIpcMain };
