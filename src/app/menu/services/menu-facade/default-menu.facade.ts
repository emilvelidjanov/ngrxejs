import { Inject, Injectable } from '@angular/core';
import { EntityPartial } from 'src/app/core/ngrx/entity/entity';

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

  public addMenuItemsConfig(partials: EntityPartial<MenuItem>[]): void {
    const menuItems = partials.map((partial) => this.menuItemService.createFromPartial(partial));
    this.menuItemService.addMany(menuItems);
  }

  public addMenuBarsConfig(partials: EntityPartial<MenuBar>[]): void {
    const menuBars = partials.map((partial) => this.menuBarService.createFromPartial(partial));
    this.menuBarService.addMany(menuBars);
  }

  public addContextMenusConfig(partials: EntityPartial<ContextMenu>[]): void {
    const contextMenus = partials.map((partial) => this.contextMenuService.createFromPartial(partial));
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

  public openContextMenu(contextMenu: ContextMenu, xPosition: number, yPosition: number): void {
    this.contextMenuService.closeAll();
    this.contextMenuService.open(contextMenu, xPosition, yPosition);
  }

  public closeContextMenu(contextMenu: ContextMenu): void {
    this.contextMenuService.close(contextMenu);
  }
}
