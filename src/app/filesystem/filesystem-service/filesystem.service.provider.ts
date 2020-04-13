import { InjectionToken, Provider } from "@angular/core";
import { FilesystemService } from './filesystem.service';
import { LocalFilesystemService } from './impl/local-filesystem.service';
import { ElectronService } from 'src/app/core/electron/electron-service/electron.service';
import { RemoteFilesystemService } from './impl/remote-filesystem.service';
import { IpcService } from '../../core/electron/ipc-service/ipc.service';

export const filesystemServiceToken: InjectionToken<FilesystemService> = new InjectionToken('FilesystemService');

const filesystemServiceFactory: Function = (electronService: ElectronService, ipcService: IpcService) => {
  let isElectron: boolean = electronService.isElectron();
  let filesystemService: FilesystemService = isElectron ? 
    new LocalFilesystemService(ipcService) : 
    new RemoteFilesystemService();
  return filesystemService;
};

export const filesystemServiceProvider: Provider = {
  provide: filesystemServiceToken,
  useFactory: filesystemServiceFactory,
  deps: [ElectronService, IpcService]
};