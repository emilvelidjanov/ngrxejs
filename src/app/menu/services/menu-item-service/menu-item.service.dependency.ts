import { MenuItemService } from './menu-item.service';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { DefaultMenuItemServie } from './default-menu-item.service';
import { Store } from '@ngrx/store';
import { MenuItems } from '../../store/menu-item/menu-item.state';

export const menuItemServiceDep: DependencyConfigurer<MenuItemService> = new DependencyConfigurer<MenuItemService>({
  tokenDescription: 'MenuItemService',
  dependencies: [
    Store,
  ],
  factory: (store: Store<MenuItems>) => {
    return new DefaultMenuItemServie(store);
  }
});
