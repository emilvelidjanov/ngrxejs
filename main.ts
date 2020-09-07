import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain } from 'electron';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import { IpcChannel } from './electron/ipc/ipc';
import { OpenDialogChannel } from './electron/ipc/filesystem/open-dialog-channel';
import { LoadDirectoryChannel } from './electron/ipc/filesystem/load-directory-channel';
import { PathUtils } from './electron/utils/path.utils';
import { LoadFileChannel } from './electron/ipc/filesystem/load-file-channel';
import { StatPathChannel } from './electron/ipc/filesystem/stat-path-channel';
import { CreateDirectoryChannel } from './electron/ipc/filesystem/create-directory-channel';
import { CreateFileChannel } from './electron/ipc/filesystem/create-file-channel';
import { DeleteFileChannel } from './electron/ipc/filesystem/delete-file-channel';

class Main {
  private readonly PROD_SWITCH: string = 'prod';

  private mainWindow: BrowserWindow;
  private readonly mainWindowOptions: BrowserWindowConstructorOptions;
  private readonly indexFile: string;
  private readonly isProd: boolean;

  constructor() {
    this.indexFile = 'dist/index.html';
    this.isProd = app.commandLine.hasSwitch(this.PROD_SWITCH);
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
    let channels = this.createIpcChannels();
    this.registerIpcChannels(channels);
    if (!this.isProd) {
      installExtension(REDUX_DEVTOOLS, false)
        .then((name) => console.info(`Added Extension: ${name}`))
        .catch((error) => console.error('An electron-devtools error occurred: ', error));
    }
  }

  private createMainWindow(): void {
    this.mainWindow = new BrowserWindow(this.mainWindowOptions);
    this.loadIndexFile();
    this.mainWindow.removeMenu();
    this.mainWindow.webContents.openDevTools();
    const _this = this;
    this.mainWindow.on('closed', () => this.windowOnClosed());
    this.mainWindow.webContents.on('did-fail-load', () => this.loadIndexFile());
  }

  private createIpcChannels(): IpcChannel<any>[] {
    const openDialogChannel = new OpenDialogChannel(this.mainWindow);
    const loadDirectoryChannel = new LoadDirectoryChannel();
    const loadFileChannel = new LoadFileChannel();
    const statPathChannel = new StatPathChannel();
    const createDirectoryChannel = new CreateDirectoryChannel();
    const createFileChannel = new CreateFileChannel();
    const deleteFileChannel = new DeleteFileChannel();
    return [openDialogChannel, loadDirectoryChannel, loadFileChannel, statPathChannel, createDirectoryChannel, createFileChannel, deleteFileChannel];
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
    ipcChannels.forEach((channel) => {
      ipcMain.on(channel.getName(), (event, args) => channel.handle(event, args));
    });
  }
}

if (!app.commandLine.hasSwitch(this.PROD_SWITCH)) {
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
