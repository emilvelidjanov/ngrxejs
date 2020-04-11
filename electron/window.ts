import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';


export let mainWindow: BrowserWindow;
export let mainWindowOptions: BrowserWindowConstructorOptions = {
  webPreferences: {
    nodeIntegration: true
  }
};

export function createMainWindow(loadFilename: string) {
  mainWindow = new BrowserWindow(mainWindowOptions);
  mainWindow.loadFile(loadFilename);
  mainWindow.webContents.openDevTools();
  mainWindow.removeMenu();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
