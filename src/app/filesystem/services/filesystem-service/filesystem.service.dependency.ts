import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { ElectronService } from 'src/app/core/electron/electron-service/electron.service';
import { IpcService } from 'src/app/core/electron/ipc-service/ipc-service';
import { ipcServiceDep } from 'src/app/core/electron/ipc-service/ipc-service.dependency';

import { FilesystemService } from './filesystem.service';
import { LocalFilesystemService } from './local-filesystem.service';
import { RemoteFilesystemService } from './remote-filesystem.service';

export const filesystemServiceDep: DependencyConfigurer<FilesystemService> = new DependencyConfigurer<
  FilesystemService
>({
  tokenDescription: 'FilesystemService',
  dependencies: [ElectronService, ipcServiceDep.getToken()],
  factory: (electronService: ElectronService, ipcService: IpcService) => {
    const isElectron = electronService.isElectron();
    const filesystemService: FilesystemService = isElectron
      ? new LocalFilesystemService(ipcService)
      : new RemoteFilesystemService();
    return filesystemService;
  },
});
