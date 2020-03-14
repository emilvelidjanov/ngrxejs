import { BrowserWindow } from 'electron';

let mainWindow: BrowserWindow;

function createMainWindow(loadFile: string) {
  mainWindow = new BrowserWindow();
  mainWindow.loadFile(loadFile);
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

export { mainWindow, createMainWindow };
