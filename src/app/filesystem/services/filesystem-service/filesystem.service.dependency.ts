import { FilesystemService } from './filesystem.service';
import { LocalFilesystemService } from './local-filesystem.service';
import { ElectronService } from 'src/app/core/electron/electron-service/electron.service';
import { RemoteFilesystemService } from './remote-filesystem.service';
import { DependencyConfigurer } from 'src/app/core/dependency-configurer/dependency-configurer';
import { ipcServiceDep } from 'src/app/core/electron/ipc-service/ipc-service.dependency';
import { IpcService } from 'src/app/core/electron/ipc-service/ipc-service';


export const filesystemServiceDep: DependencyConfigurer<FilesystemService> = new DependencyConfigurer<FilesystemService>({
  tokenDescription: 'FilesystemService',
  dependencies: [ElectronService, ipcServiceDep.getToken()],
  factory: (electronService: ElectronService, ipcService: IpcService) => {
    let isElectron: boolean = electronService.isElectron();
    let filesystemService: FilesystemService = isElectron ? 
      new LocalFilesystemService(ipcService) : 
      new RemoteFilesystemService();
    return filesystemService;
  }
});