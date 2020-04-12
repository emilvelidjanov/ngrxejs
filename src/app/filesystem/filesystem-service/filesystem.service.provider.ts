import { InjectionToken, Provider } from "@angular/core";
import { FilesystemService } from './filesystem.service';
import { LocalFilesystemService } from './impl/local-filesystem.service';
import { ElectronService } from 'src/app/filesystem/electron-service/electron.service';
import { RemoteFilesystemService } from './impl/remote-filesystem.service';
import { IpcService } from '../ipc-service/ipc.service';

const filesystemServiceToken: InjectionToken<FilesystemService> = new InjectionToken('FilesystemService');

const filesystemServiceFactory: Function = (electronService: ElectronService, ipcService: IpcService) => {
  let isElectron: boolean = electronService.isElectron();
  let filesystemService: FilesystemService = isElectron ? 
    new LocalFilesystemService(ipcService) : 
    new RemoteFilesystemService();
  return filesystemService;
};

const filesystemServiceProvider: Provider = {
  provide: filesystemServiceToken,
  useFactory: filesystemServiceFactory,
  deps: [ElectronService, IpcService]
};

export { filesystemServiceProvider, filesystemServiceToken };