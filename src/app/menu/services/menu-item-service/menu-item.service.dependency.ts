import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';

import { MenuItems } from '../../store/menu-item/menu-item.state';

import { DefaultMenuItemService } from './default-menu-item.service';
import { MenuItemService } from './menu-item.service';

export const menuItemServiceDep: DependencyConfigurer<MenuItemService> = new DependencyConfigurer<MenuItemService>({
  tokenDescription: 'MenuItemService',
  dependencies: [Store],
  factory: (store: Store<MenuItems>) => {
    return new DefaultMenuItemService(store);
  },
});
