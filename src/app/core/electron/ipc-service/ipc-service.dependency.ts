import { DependencyConfigurer } from '../../angular/dependency-configurer';
import { IpcService } from './ipc-service';
import { ElectronService } from '../electron-service/electron.service';
import { DefaultIpcService } from './default-ipc.service';
import { DummyIpcService } from './dummy-ipc.service';


export const ipcServiceDep: DependencyConfigurer<IpcService> = new DependencyConfigurer<IpcService>({
  tokenDescription: 'IpcService',
  dependencies: [ElectronService],
  factory: (electronService: ElectronService) => {
    const isElectron: boolean = electronService.isElectron();
    const ipcService: IpcService = isElectron ?
      new DefaultIpcService(electronService) :
      new DummyIpcService();
    return ipcService;
  }
});
