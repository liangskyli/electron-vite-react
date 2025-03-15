import { app, protocol } from 'electron';
import { createMainWindow } from './main-window';

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      secure: true,
      standard: true,
      supportFetchAPI: false,
      allowServiceWorkers: false,
    },
  },
]);

app.whenReady().then(() => {
  createMainWindow();
});
