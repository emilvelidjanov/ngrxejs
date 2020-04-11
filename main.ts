import { app } from 'electron';
import { mainWindow, createMainWindow } from './electron/window';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import { registerIpcEvents } from './electron/filesystem';


export const indexFile: string = 'dist/index.html';
export const isProd: boolean = app.commandLine.hasSwitch('prod');

app.allowRendererProcessReuse = true;

app.on('ready', () => {
  createMainWindow(indexFile);
  if (!isProd) {
    installExtension(REDUX_DEVTOOLS)
      .then((name) => console.info(`Added Extension: ${name}`))
      .catch((err) => console.error('An error occurred: ', err));
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow(indexFile);
  }
});

registerIpcEvents();
