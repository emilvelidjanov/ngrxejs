import { BrowserWindow } from "electron";
import { environment } from "../src/environments/environment";

let mainWindow: BrowserWindow;

function createMainWindow(loadFile: string) {
  mainWindow = new BrowserWindow();
  mainWindow.loadFile(loadFile);
  if (!environment.production) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

export { mainWindow, createMainWindow };
