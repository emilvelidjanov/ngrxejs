import { DependencyConfigurer } from '../../dependency-configurer/dependency-configurer';
import { IpcService } from './ipc-service';
import { ElectronService } from '../electron-service/electron.service';
import { DefaultIpcService } from './impl/default-ipc.service';
import { DummyIpcService } from './impl/dummy-ipc.service';


export const ipcServiceDep: DependencyConfigurer<IpcService> = new DependencyConfigurer<IpcService>({
  tokenDescription: 'IpcService',
  dependencies: [ElectronService],
  factory: (electronService: ElectronService) => {
    let isElectron: boolean = electronService.isElectron();
    let ipcService: IpcService = isElectron ?
      new DefaultIpcService(electronService) :
      new DummyIpcService();
    return ipcService;
  }
});