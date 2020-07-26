import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { ActionDescriptorService } from 'src/app/core/ngrx/services/action-descriptor-service/action-descriptor.service';
import { actionDescriptorServiceDep } from 'src/app/core/ngrx/services/action-descriptor-service/action-descriptor.service.dependency';

import { MenuItems } from '../../store/menu-item/menu-item.state';

import { DefaultMenuItemService } from './default-menu-item.service';
import { MenuItemService } from './menu-item.service';

export const menuItemServiceDep: DependencyConfigurer<MenuItemService> = new DependencyConfigurer<MenuItemService>({
  tokenDescription: 'MenuItemService',
  dependencies: [Store, actionDescriptorServiceDep.getToken()],
  factory: (store: Store<MenuItems>, actionDescriptorService: ActionDescriptorService) => {
    return new DefaultMenuItemService(store, actionDescriptorService);
  },
});
