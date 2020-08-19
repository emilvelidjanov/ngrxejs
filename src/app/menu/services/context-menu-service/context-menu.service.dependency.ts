import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { equalityServiceDep } from 'src/app/core/services/equality-service/equality.service.dependency';

import { ContextMenus } from '../../store/context-menu/context-menu.state';

import { ContextMenuService } from './context-menu.service';
import { DefaultContextMenuService } from './default-context-menu.service';

export const contextMenuServiceDep: DependencyConfigurer<ContextMenuService> = new DependencyConfigurer<ContextMenuService>({
  tokenDescription: 'ContextMenuService',
  dependencies: [Store, equalityServiceDep.getToken()],
  factory: (store: Store<ContextMenus>) => {
    return new DefaultContextMenuService(store);
  },
});
