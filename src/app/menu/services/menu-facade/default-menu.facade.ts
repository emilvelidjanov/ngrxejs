import { Inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';
import { Prop } from 'src/app/core/ngrx/entity/entity-domain-state/props';

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
    const menuItems = partials.map((partial) => this.menuItemService.createDefault(partial));
    this.menuItemService.addMany(menuItems);
  }

  public addMenuBarsConfig(partials: EntityPartial<MenuBar>[]): void {
    const menuBars = partials.map((partial) => this.menuBarService.createDefault(partial));
    this.menuBarService.addMany(menuBars);
  }

  public addContextMenusConfig(partials: EntityPartial<ContextMenu>[]): void {
    const contextMenus = partials.map((partial) => this.contextMenuService.createDefault(partial));
    this.contextMenuService.addMany(contextMenus);
  }

  public addTabBarsConfig(partials: EntityPartial<TabBar>[]): void {
    const tabBars = partials.map((partial) => this.tabBarService.createDefault(partial));
    this.tabBarService.addMany(tabBars);
  }

  public addTabItemsConfig(partials: EntityPartial<TabItem>[]): void {
    const tabItems = partials.map((partial) => this.tabItemService.createDefault(partial));
    this.tabItemService.addMany(tabItems);
  }

  public createTabItem(): Observable<TabItem> {
    return this.tabItemService.createOne({});
  }

  public selectTabBar(id: Id): Observable<TabBar> {
    return this.tabBarService.selectOne(id);
  }

  public selectTabItem(id: Id): Observable<TabItem> {
    return this.tabItemService.selectOne(id);
  }

  public addTabItemsToTabBar(tabItems: TabItem[], tabBar: TabBar): void {
    this.tabBarService.addTabItems(tabItems, tabBar);
  }

  public removeTabItemsFromTabBar(tabItems: TabItem[], tabBar: TabBar): void {
    this.tabBarService.removeTabItems(tabItems, tabBar);
  }

  public removeTabItems(tabItems: TabItem[]): void {
    this.tabItemService.removeMany(tabItems);
  }

  public onClickMenuItem(menuItem: MenuItem): void {
    if (!this.menuItemService.isDisabled(menuItem)) {
      this.menuItemService.closeAll();
      this.contextMenuService.closeAll();
      this.menuItemService.open(menuItem);
      this.menuItemService.dispatchClickAction(menuItem);
    }
  }

  public toggleOpenedMenuItem(menuItem: MenuItem): void {
    this.menuItemService.toggleOpened(menuItem);
  }

  public dispatchClickActionTabItem(tabItem: TabItem): void {
    this.tabItemService.dispatchClickAction(tabItem);
  }

  public closeAllMenuItems(): void {
    this.menuItemService.closeAll();
  }

  public openContextMenu(contextMenu: ContextMenu, xPosition: number, yPosition: number, contextProps: Prop): void {
    this.contextMenuService.closeAll();
    this.contextMenuService.updateContextProps(contextProps, contextMenu);
    const menuItems$ = this.menuItemService.selectManyByContextMenu(contextMenu).pipe(take(1));
    const nestedMenuItems$ = menuItems$.pipe(
      switchMap((menuItems) => this.menuItemService.selectNested(menuItems)),
      take(1),
    );
    forkJoin([menuItems$, nestedMenuItems$]).subscribe(([menuItems, nestedMenuItems]) => {
      this.menuItemService.upsertOnClickActionProps(contextProps, [...menuItems, ...nestedMenuItems]);
    });
    this.contextMenuService.open(contextMenu, xPosition, yPosition);
  }

  public closeContextMenu(contextMenu: ContextMenu): void {
    this.contextMenuService.close(contextMenu);
  }

  public closeTabItem(tabItem: TabItem): void {
    this.tabItemService.dispatchCloseAction(tabItem);
  }

  public updateIsDisabledMenuItem(isDisabled: boolean, menuItem: MenuItem): void {
    this.menuItemService.updateIsDisabled(isDisabled, menuItem);
  }
}
