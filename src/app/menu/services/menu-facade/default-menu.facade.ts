import { Inject, Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';

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

  public click(menuItem: MenuItem): void {
    const isOpened$ = this.menuItemService.isOpened(menuItem);
    isOpened$
      .pipe(
        tap((isOpened: boolean) => (isOpened ? this.menuItemService.closeAll() : this.menuItemService.open(menuItem))),
        take(1),
      )
      .subscribe();
    if (menuItem.clickAction) {
      this.menuItemService.dispatchClickAction(menuItem);
      this.menuItemService.closeAll();
    }
  }

  public offClick(htmlNodeName: string): void {
    if (htmlNodeName !== this.menuItemService.getHtmlNodeName()) {
      this.menuItemService.closeAll();
    }
  }

  public openContextMenu(menuId: Id, x: number, y: number): void {
    this.menuService.open(menuId);
    this.menuService.updatePosition(menuId, x, y);
  }
}
