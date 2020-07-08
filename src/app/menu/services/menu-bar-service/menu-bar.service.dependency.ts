import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';

import { MenuBars } from '../../store/menu-bar/menu-bar.state';

import { DefaultMenuBarService } from './default-menu-bar.service';
import { MenuBarService } from './menu-bar.service';

export const menuBarServiceDep: DependencyConfigurer<MenuBarService> = new DependencyConfigurer<MenuBarService>({
  tokenDescription: 'MenuBarService',
  dependencies: [Store],
  factory: (store: Store<MenuBars>) => {
    return new DefaultMenuBarService(store);
  },
});
