import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ClickOffDirective } from './directives/click-off.directive';
import { ElectronService } from './electron/electron-service/electron.service';
import { ipcServiceDep } from './electron/ipc-service/ipc-service.dependency';
import {
  numberIdGeneratorServiceDep,
  uuidGeneratorServiceDep,
} from './ngrx/services/id-generator-service/id-generator.service.dependency';
import { sortServiceDep } from './services/sort-service/sort.service.dependency';

@NgModule({
  declarations: [ClickOffDirective],
  imports: [CommonModule],
  exports: [ClickOffDirective],
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ElectronService,
        ipcServiceDep.getProvider(),
        numberIdGeneratorServiceDep.getProvider(),
        uuidGeneratorServiceDep.getProvider(),
        sortServiceDep.getProvider(),
      ],
    };
  }
}
