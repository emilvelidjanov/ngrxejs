import { MenuFacade } from './menu.facade';
import { Injectable, Inject } from '@angular/core';
import { menuItemServiceDep } from '../menu-item-service/menu-item.service.dependency';
import { MenuItemService } from '../menu-item-service/menu-item.service';
import { menuServiceDep } from '../menu-service/menu.service.dependency';
import { MenuService } from '../menu-service/menu.service';


@Injectable()
export class DefaultMenuFacade implements MenuFacade {

  constructor(
    @Inject(menuItemServiceDep.getToken()) private menuItemService: MenuItemService,
    @Inject(menuServiceDep.getToken) private menuService: MenuService,
  ) {
    this.menuItemService.initMenuItems();
    this.menuService.initMenus();
  }
}
