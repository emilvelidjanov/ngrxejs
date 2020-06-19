import { Inject, Injectable } from '@angular/core';

import { MenuItem } from '../../store/menu-item/menu-item.state';
import { Menu } from '../../store/menu/menu.state';
import { MenuItemService } from '../menu-item-service/menu-item.service';
import { menuItemServiceDep } from '../menu-item-service/menu-item.service.dependency';
import { MenuService } from '../menu-service/menu.service';
import { menuServiceDep } from '../menu-service/menu.service.dependency';

import { MenuFacade } from './menu.facade';

@Injectable()
export class DefaultMenuFacade implements MenuFacade {
  constructor(
    @Inject(menuItemServiceDep.getToken()) private menuItemService: MenuItemService,
    @Inject(menuServiceDep.getToken) private menuService: MenuService,
  ) {}

  public addMenus(menu: Menu[], menuItems: MenuItem[]): void {
    this.menuItemService.addMany(menuItems);
    this.menuService.addMany(menu);
  }

  public onClickMenuItem(menuItem: MenuItem): void {
    this.menuItemService.open(menuItem);
    if (menuItem.clickAction) {
      this.menuItemService.dispatchClickAction(menuItem);
      this.menuItemService.closeAll();
    }
  }

  public onClickOffMenuItem(htmlNodeName: string): void {
    if (htmlNodeName !== this.menuItemService.getHtmlNodeName()) {
      this.menuItemService.closeAll();
    }
  }
}
