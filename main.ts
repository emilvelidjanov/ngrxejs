import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain, IpcMainEvent } from 'electron';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import { IpcChannel, IpcRequest } from './electron/ipc/ipc';
import { OpenDialogChannel } from './electron/ipc/filesystem/open-dialog-channel';
import { LoadDirectoryChannel } from './electron/ipc/filesystem/load-directory-channel';
import { PathUtils } from './electron/utils/path.utils';
import { LoadFileChannel } from './electron/ipc/filesystem/load-file-channel';

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
        nodeIntegration: true,
      },
    };
  }

  public init(): void {
    app.allowRendererProcessReuse = true;
    app.on('ready', () => this.onReady());
    app.on('window-all-closed', () => this.onWindowAllClosed());
    app.on('activate', () => this.onActivate());
  }

  private onReady(): void {
    this.createMainWindow();
    let channels: IpcChannel<any>[] = this.createIpcChannels();
    this.registerIpcChannels(channels);
    if (!this.isProd) {
      installExtension(REDUX_DEVTOOLS, false)
        .then((name: string) => console.info(`Added Extension: ${name}`))
        .catch((error: any) => console.error('An error occurred: ', error));
    }
  }

  private createMainWindow(): void {
    this.mainWindow = new BrowserWindow(this.mainWindowOptions);
    this.loadIndexFile();
    this.mainWindow.removeMenu();
    this.mainWindow.webContents.openDevTools();
    const _this = this;
    this.mainWindow.on('closed', () => _this.windowOnClosed());
    this.mainWindow.webContents.on('did-fail-load', () => _this.loadIndexFile());
  }

  private createIpcChannels(): IpcChannel<any>[] {
    const openDialogChannel: OpenDialogChannel = new OpenDialogChannel(this.mainWindow);
    const loadDirectoryChannel: LoadDirectoryChannel = new LoadDirectoryChannel();
    const loadFileChannel: LoadFileChannel = new LoadFileChannel();
    const channels: IpcChannel<any>[] = [openDialogChannel, loadDirectoryChannel, loadFileChannel];
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
      this.createMainWindow();
    }
  }

  private loadIndexFile(): void {
    this.mainWindow.loadFile(this.indexFile);
  }

  public registerIpcChannels(ipcChannels: IpcChannel<any>[]): void {
    ipcChannels.forEach((channel: IpcChannel<any>) => {
      ipcMain.on(channel.getName(), (event: IpcMainEvent, request: IpcRequest<any>) => {
        channel.handle(event, request);
      });
    });
  }
}

if (!app.commandLine.hasSwitch(Main.PROD_SWITCH)) {
  const rootPath = PathUtils.getDirname(__dirname);
  const distPath = PathUtils.joinPath(rootPath, 'dist');
  const electronPath = PathUtils.joinPath(rootPath, 'node_modules', 'electron');
  require('electron-reload')(distPath, {
    electron: require(electronPath),
    chokidar: {
      awaitWriteFinish: true,
    },
  });
}

const main: Main = new Main();
main.init();
