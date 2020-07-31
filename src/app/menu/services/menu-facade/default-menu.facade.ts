import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityPartial } from 'src/app/core/ngrx/entity/entity';

import { ContextMenu } from '../../store/context-menu/context-menu.state';
import { MenuBar } from '../../store/menu-bar/menu-bar.state';
import { MenuItem } from '../../store/menu-item/menu-item.state';
import { TabBar } from '../../store/tab-bar/tab-bar.state';
import { TabItem } from '../../store/tab-item/tab-item.state';
import { ContextMenuService } from '../context-menu-service/context-menu.service';
import { contextMenuServiceDep } from '../context-menu-service/context-menu.service.dependency';
import { MenuBarService } from '../menu-bar-service/menu-bar.service';
import { menuBarServiceDep } from '../menu-bar-service/menu-bar.service.dependency';
import { MenuItemService } from '../menu-item-service/menu-item.service';
import { menuItemServiceDep } from '../menu-item-service/menu-item.service.dependency';
import { TabBarService } from '../tab-bar-service/tab-bar.service';
import { tabBarServiceDep } from '../tab-bar-service/tab-bar.service.dependency';
import { TabItemService } from '../tab-item-service/tab-item.service';
import { tabItemServiceDep } from '../tab-item-service/tab-item.service.dependency';

import { MenuFacade } from './menu.facade';

@Injectable()
export class DefaultMenuFacade implements MenuFacade {
  constructor(
    @Inject(menuItemServiceDep.getToken()) private menuItemService: MenuItemService,
    @Inject(menuBarServiceDep.getToken) private menuBarService: MenuBarService,
    @Inject(contextMenuServiceDep.getToken()) private contextMenuService: ContextMenuService,
    @Inject(tabBarServiceDep.getToken()) private tabBarService: TabBarService,
    @Inject(tabItemServiceDep.getToken()) private tabItemService: TabItemService,
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

  public addTabBarsConfig(partials: EntityPartial<TabBar>[]): void {
    const tabBars = partials.map((partial) => this.tabBarService.createFromPartial(partial));
    this.tabBarService.addMany(tabBars);
  }

  public addTabItemsConfig(partials: EntityPartial<TabItem>[]): void {
    const tabItems = partials.map((partial) => this.tabItemService.createFromPartial(partial));
    this.tabItemService.addMany(tabItems);
  }

  public createTabItem(): Observable<TabItem> {
    return this.tabItemService.createDefault();
  }

  public selectTabBar(id: string): Observable<TabBar> {
    return this.tabBarService.select(id);
  }

  public addTabItemsToTabBar(tabItems: TabItem[], tabBar: TabBar): void {
    this.tabBarService.addTabItems(tabItems, tabBar);
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
