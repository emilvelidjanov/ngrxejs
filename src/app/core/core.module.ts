import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectronService } from './electron/electron-service/electron.service';
import { ipcServiceDep } from './electron/ipc-service/ipc-service.dependency';
import { numberIdGeneratorServiceDep, uuidGeneratorServiceDep } from './ngrx/services/id-generator-service/id-generator.service.dependency';


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
      providers: [
        ElectronService,
        ipcServiceDep.getProvider(),
        numberIdGeneratorServiceDep.getProvider(),
        uuidGeneratorServiceDep.getProvider(),
      ]
    }
  }
}
