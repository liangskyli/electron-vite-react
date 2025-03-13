import { app, protocol } from 'electron';
import { initIpcMain } from './ipc.ts';
import { createMainWindow } from './main-window';

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      secure: true,
      standard: true,
      supportFetchAPI: true,
      allowServiceWorkers: true,
    },
  },
]);

initIpcMain();
app.whenReady().then(() => {
  createMainWindow();
});
