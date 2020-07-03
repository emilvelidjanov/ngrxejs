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

  public addMenusConfiguration(menus: Menu[], menuItems: MenuItem[]): void {
    this.menuItemService.populateOptionals(menuItems);
    this.menuItemService.addMany(menuItems);
    this.menuService.populateOptionals(menus);
    this.menuService.addMany(menus);
  }

  public onClickMenuItem(menuItem: MenuItem): void {
    this.menuItemService.closeAll();
    this.menuItemService.open(menuItem);
    this.menuItemService.dispatchClickAction(menuItem);
  }

  public offClickMenuItemNestedMenuItems(): void {
    this.menuItemService.closeAll();
  }

  public openContextMenu(menu: Menu, x: number, y: number): void {
    this.menuService.closeAll();
    this.menuService.updatePosition(menu, x, y);
    this.menuService.open(menu);
  }

  public closeMenu(menu: Menu): void {
    this.menuService.close(menu);
  }
}
