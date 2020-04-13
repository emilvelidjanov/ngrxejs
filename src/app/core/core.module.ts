import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectronService } from './electron/electron-service/electron.service';
import { IpcService } from './electron/ipc-service/ipc.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [ElectronService, IpcService]
    }
  }
}
