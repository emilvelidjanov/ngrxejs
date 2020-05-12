import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { MenuService } from './menu.service';
import { Store } from '@ngrx/store';
import { Menus } from '../../store/menu/menu.state';
import { DefaultMenuService } from './default-menu.service';

export const menuServiceDep: DependencyConfigurer<MenuService> = new DependencyConfigurer<MenuService>({
  tokenDescription: 'MenuService',
  dependencies: [
    Store,
  ],
  factory: (store: Store<Menus>) => {
    return new DefaultMenuService(store);
  }
});