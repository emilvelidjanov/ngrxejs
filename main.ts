import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain, IpcMainEvent } from 'electron';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import { IpcChannel, IpcRequest } from "./electron/ipc/ipc";
import { OpenSelectDialogChannel } from './electron/ipc/impl/open-select-dialog-channel';


class Main {
  
  static PROD_SWITCH: string = 'prod';

  private mainWindow: BrowserWindow;
  private mainWindowOptions: BrowserWindowConstructorOptions;
  private indexFile: string;
  private isProd: boolean;

  constructor() {
    this.indexFile = 'dist/index.html';
    this.isProd = app.commandLine.hasSwitch(Main.PROD_SWITCH);
    this.mainWindowOptions = {
      webPreferences: {
        nodeIntegration: true
      }
    }
  }

  public init(): void {
    app.allowRendererProcessReuse = true;
    app.on('ready', () => this.onReady());
    app.on('window-all-closed', () => this.onWindowAllClosed());
    app.on('activate', () => this.onActivate());
  }

  private onReady(): void {
    this.createMainWindow(this.indexFile);
    let channels: IpcChannel[] = this.createIpcChannels();
    this.registerIpcChannels(channels);
    if (!this.isProd) {
      installExtension(REDUX_DEVTOOLS)
      .then((name: string) => console.info(`Added Extension: ${name}`))
      .catch((error: any) => console.error('An error occurred: ', error));
    }
  }

  private createMainWindow(indexFile: string): void {
    this.mainWindow = new BrowserWindow(this.mainWindowOptions);
    this.mainWindow.loadFile(indexFile);
    this.mainWindow.removeMenu();
    this.mainWindow.webContents.openDevTools();
    this.mainWindow.on('closed', this.windowOnClosed);
  }

  private createIpcChannels(): IpcChannel[] {
    let openSelectDialogChannel: OpenSelectDialogChannel = new OpenSelectDialogChannel(this.mainWindow);
    let channels: IpcChannel[] = [
      openSelectDialogChannel
    ]
    return channels;
  }

  private windowOnClosed(): void {
    this.mainWindow = null;
  }

  private onWindowAllClosed(): void {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private onActivate(): void {
    if (this.mainWindow === null) {
      this.createMainWindow(this.indexFile);
    }
  }

  public registerIpcChannels(ipcChannels: IpcChannel[]): void {
    ipcChannels.forEach((channel: IpcChannel) => ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request)));
  }
}

let main: Main = new Main();
main.init();