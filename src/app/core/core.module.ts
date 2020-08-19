import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { FocusInputComponent } from './components/focus-input/focus-input.component';
import { PrePostSymbolsComponent } from './components/pre-post-symbols/pre-post-symbols.component';
import { OffClickDirective } from './directives/off-click.directive';
import { ElectronService } from './electron/electron-service/electron.service';
import { ipcServiceDep } from './electron/ipc-service/ipc-service.dependency';
import { actionDescriptorServiceDep } from './ngrx/services/action-descriptor-service/action-descriptor.service.dependency';
import {
  numberIdGeneratorServiceDep,
  uuidGeneratorServiceDep,
} from './ngrx/services/id-generator-service/id-generator.service.dependency';
import { domServiceDep } from './services/DOM-service/dom.service.dependency';
import { equalityServiceDep } from './services/equality-service/equality.service.dependency';
import { sortServiceDep } from './services/sort-service/sort.service.dependency';

@NgModule({
  declarations: [OffClickDirective, PrePostSymbolsComponent, FocusInputComponent],
  imports: [CommonModule],
  exports: [OffClickDirective, PrePostSymbolsComponent, FocusInputComponent],
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
        domServiceDep.getProvider(),
        actionDescriptorServiceDep.getProvider(),
        equalityServiceDep.getProvider(),
      ],
    };
  }
}
