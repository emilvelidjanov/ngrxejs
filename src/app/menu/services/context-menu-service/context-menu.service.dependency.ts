import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { uuidGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { ContextMenus } from '../../store/context-menu/context-menu.state';

import { ContextMenuService } from './context-menu.service';
import { DefaultContextMenuService } from './default-context-menu.service';

export const contextMenuServiceDep: DependencyConfigurer<ContextMenuService> = new DependencyConfigurer<ContextMenuService>({
  tokenDescription: 'ContextMenuService',
  dependencies: [Store, uuidGeneratorServiceDep.getToken()],
  factory: (store: Store<ContextMenus>, idGeneratorService: IdGeneratorService) => {
    return new DefaultContextMenuService(store, idGeneratorService);
  },
});
