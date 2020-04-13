import { FilesystemService } from './filesystem.service';
import { LocalFilesystemService } from './impl/local-filesystem.service';
import { ElectronService } from 'src/app/core/electron/electron-service/electron.service';
import { RemoteFilesystemService } from './impl/remote-filesystem.service';
import { IpcService } from '../../core/electron/ipc-service/ipc.service';
import { DependencyConfigurer } from 'src/app/core/dependency-configurer/dependency-configurer';


export const filesystemServiceDep: DependencyConfigurer<FilesystemService> = new DependencyConfigurer<FilesystemService>({
  tokenDescription: 'FilesystemService',
  dependencies: [ElectronService, IpcService],
  factory: (electronService: ElectronService, ipcService: IpcService) => {
    let isElectron: boolean = electronService.isElectron();
    let filesystemService: FilesystemService = isElectron ? 
      new LocalFilesystemService(ipcService) : 
      new RemoteFilesystemService();
    return filesystemService;
  }
});