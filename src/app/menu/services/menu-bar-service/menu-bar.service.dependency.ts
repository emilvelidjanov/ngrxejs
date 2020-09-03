import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { uuidGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { MenuBars } from '../../store/menu-bar/menu-bar.state';

import { DefaultMenuBarService } from './default-menu-bar.service';
import { MenuBarService } from './menu-bar.service';

export const menuBarServiceDep: DependencyConfigurer<MenuBarService> = new DependencyConfigurer<MenuBarService>({
  tokenDescription: 'MenuBarService',
  dependencies: [Store, uuidGeneratorServiceDep.getToken()],
  factory: (store: Store<MenuBars>, idGeneratorService: IdGeneratorService) => {
    return new DefaultMenuBarService(store, idGeneratorService);
  },
});
