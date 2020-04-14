import { FilesystemService } from './filesystem.service';
import { LocalFilesystemService } from './impl/local-filesystem.service';
import { ElectronService } from 'src/app/core/electron/electron-service/electron.service';
import { RemoteFilesystemService } from './impl/remote-filesystem.service';
import { DependencyConfigurer } from 'src/app/core/dependency-configurer/dependency-configurer';
import { ipcServiceDep } from 'src/app/core/electron/ipc-service/ipc-service.dependency';
import { IpcService } from 'src/app/core/electron/ipc-service/ipc-service';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';


export const filesystemServiceDep: DependencyConfigurer<FilesystemService> = new DependencyConfigurer<FilesystemService>({
  tokenDescription: 'FilesystemService',
  dependencies: [ElectronService, Store, ipcServiceDep.getToken()],
  factory: (electronService: ElectronService, store: Store<State>, ipcService: IpcService) => {
    let isElectron: boolean = electronService.isElectron();
    let filesystemService: FilesystemService = isElectron ? 
      new LocalFilesystemService(store, ipcService) : 
      new RemoteFilesystemService();
    return filesystemService;
  }
});