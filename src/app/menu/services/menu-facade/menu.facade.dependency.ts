import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { MenuFacade } from './menu.facade';
import { DefaultMenuFacade } from './default-menu.facade';
import { menuItemServiceDep } from '../menu-item-service/menu-item.service.dependency';
import { MenuItemService } from '../menu-item-service/menu-item.service';
import { menuServiceDep } from '../menu-service/menu.service.dependency';
import { MenuService } from '../menu-service/menu.service';


export const menuFacadeDep: DependencyConfigurer<MenuFacade> = new DependencyConfigurer<MenuFacade>({
  tokenDescription: 'MenuFacade',
  dependencies: [
    menuItemServiceDep.getToken(),
    menuServiceDep.getToken(),
  ],
  factory: (
    menuItemService: MenuItemService,
    menuService: MenuService,
  ) => {
    return new DefaultMenuFacade(menuItemService, menuService);
  }
});
