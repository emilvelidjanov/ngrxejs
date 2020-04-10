import { BrowserWindow } from 'electron';


let mainWindow: BrowserWindow;

function createMainWindow(loadFilename: string) {
  mainWindow = new BrowserWindow();
  mainWindow.loadFile(loadFilename);
  mainWindow.webContents.openDevTools();
  mainWindow.removeMenu();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

export { mainWindow, createMainWindow };
