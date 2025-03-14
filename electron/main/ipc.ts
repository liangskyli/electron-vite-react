import { ipcMain } from 'electron';
import { callDllExample, getKeyboardState, keyParam } from './dll/user32.ts';

const initIpcMain = () => {
  ipcMain.handle('callDllExample', async () => {
    callDllExample();
    const result = { code: 'ok' };
    return result;
  });
  ipcMain.handle('getKeyboardCapLockState', async () => {
    const { result, lpKeyState } = getKeyboardState();
    let isCapLock = false;
    if (result) {
      isCapLock = lpKeyState[keyParam['capslock']] === 1;
    }
    return { isSuccess: result, isCapLock };
  });
};
export { initIpcMain };
