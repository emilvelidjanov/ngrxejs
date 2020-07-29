import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';

import { ContextMenuService } from '../context-menu-service/context-menu.service';
import { contextMenuServiceDep } from '../context-menu-service/context-menu.service.dependency';
import { MenuBarService } from '../menu-bar-service/menu-bar.service';
import { menuBarServiceDep } from '../menu-bar-service/menu-bar.service.dependency';
import { MenuItemService } from '../menu-item-service/menu-item.service';
import { menuItemServiceDep } from '../menu-item-service/menu-item.service.dependency';
import { TabBarService } from '../tab-bar-service/tab-bar.service';
import { tabBarServiceDep } from '../tab-bar-service/tab-bar.service.dependency';

import { DefaultMenuFacade } from './default-menu.facade';
import { MenuFacade } from './menu.facade';

export const menuFacadeDep: DependencyConfigurer<MenuFacade> = new DependencyConfigurer<MenuFacade>({
  tokenDescription: 'MenuFacade',
  dependencies: [
    menuItemServiceDep.getToken(),
    menuBarServiceDep.getToken(),
    contextMenuServiceDep.getToken(),
    tabBarServiceDep.getToken(),
  ],
  factory: (
    menuItemService: MenuItemService,
    menuBarService: MenuBarService,
    contextMenuService: ContextMenuService,
    tabBarService: TabBarService,
  ) => {
    return new DefaultMenuFacade(menuItemService, menuBarService, contextMenuService, tabBarService);
  },
});
