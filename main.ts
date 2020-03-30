import { app } from 'electron';
import { mainWindow, createMainWindow } from './electron/window';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';

const indexFile: string = 'dist/index.html';

app.allowRendererProcessReuse = true;

app.on('ready', () => {
  createMainWindow(indexFile);
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.info(`Added Extension: ${name}`))
    .catch((err) => console.error('An error occurred: ', err));
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

export { indexFile };
