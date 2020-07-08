import { Inject, Injectable } from '@angular/core';

import { ContextMenu } from '../../store/context-menu/context-menu.state';
import { MenuBar } from '../../store/menu-bar/menu-bar.state';
import { MenuItem } from '../../store/menu-item/menu-item.state';
import { ContextMenuService } from '../context-menu-service/context-menu.service';
import { contextMenuServiceDep } from '../context-menu-service/context-menu.service.dependency';
import { MenuBarService } from '../menu-bar-service/menu-bar.service';
import { menuBarServiceDep } from '../menu-bar-service/menu-bar.service.dependency';
import { MenuItemService } from '../menu-item-service/menu-item.service';
import { menuItemServiceDep } from '../menu-item-service/menu-item.service.dependency';

import { MenuFacade } from './menu.facade';

@Injectable()
export class DefaultMenuFacade implements MenuFacade {
  constructor(
    @Inject(menuItemServiceDep.getToken()) private menuItemService: MenuItemService,
    @Inject(menuBarServiceDep.getToken) private menuBarService: MenuBarService,
    @Inject(contextMenuServiceDep.getToken()) private contextMenuService: ContextMenuService,
  ) {}

  public addMenuItemsConfig(menuItems: MenuItem[]): void {
    menuItems = this.menuItemService.populateOptionals(menuItems);
    this.menuItemService.addMany(menuItems);
  }

  public addMenuBarsConfig(menuBars: MenuBar[]): void {
    menuBars = this.menuBarService.populateOptionals(menuBars);
    this.menuBarService.addMany(menuBars);
  }

  public addContextMenusConfig(contextMenus: ContextMenu[]): void {
    contextMenus = this.contextMenuService.populateOptionals(contextMenus);
    this.contextMenuService.addMany(contextMenus);
  }

  public onClickMenuItem(menuItem: MenuItem): void {
    this.menuItemService.closeAll();
    this.contextMenuService.closeAll();
    this.menuItemService.open(menuItem);
    this.menuItemService.dispatchClickAction(menuItem);
  }

  public offClickMenuItemNestedMenuItems(): void {
    this.menuItemService.closeAll();
  }

  public openContextMenu(menu: ContextMenu, x: number, y: number): void {
    this.contextMenuService.closeAll();
    this.contextMenuService.updatePosition(menu, x, y);
    this.contextMenuService.open(menu);
  }

  public closeContextMenu(menu: ContextMenu): void {
    this.contextMenuService.close(menu);
  }
}
