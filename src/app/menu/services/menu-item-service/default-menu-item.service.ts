import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { menuItemActions } from '../../store/menu-item/menu-item.actions';
import { menuItemSelectors } from '../../store/menu-item/menu-item.selectors';
import { MenuItem, MenuItems } from '../../store/menu-item/menu-item.state';

import { MenuItemService } from './menu-item.service';

@Injectable()
export class DefaultMenuItemService implements MenuItemService {
  constructor(private store: Store<MenuItems>) {}

  public addMany(menuItems: MenuItem[]): void {
    this.store.dispatch(menuItemActions.addMany({ entities: menuItems }));
  }

  public toggleOpened(menuItem: MenuItem): void {
    if (menuItem.menuItemIds && menuItem.menuItemIds.length) {
      this.store.dispatch(menuItemActions.toggleOpenedId({ id: menuItem.id }));
    }
  }

  public dispatchClickAction(menuItem: MenuItem): void {
    this.store.dispatch({ type: menuItem.clickAction });
  }

  public closeAll(): void {
    this.store.dispatch(menuItemActions.setOpenedIds({ ids: [] }));
  }

  public isOpened(menuItem: any): Observable<boolean> {
    return this.store.pipe(select(menuItemSelectors.selectIsOpenedId, { id: menuItem.id }));
  }

  public getHtmlNodeName(): string {
    return 'APP-MENU-ITEM';
  }
}
