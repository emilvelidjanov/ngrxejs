import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { menuItemActions } from '../../store/menu-item/menu-item.actions';
import { menuItemSelectors } from '../../store/menu-item/menu-item.selectors';
import { MenuItem, MenuItems } from '../../store/menu-item/menu-item.state';

import { MenuItemService } from './menu-item.service';

@Injectable()
export class DefaultMenuItemService implements MenuItemService {
  constructor(private store: Store<MenuItems>) {}

  public addMenuItems(menuItems: MenuItem[]): void {
    this.store.dispatch(menuItemActions.addMany({ entities: menuItems }));
  }

  public dispatchToggleOpenedMenuItem(menuItem: MenuItem): void {
    const isOpened$ = this.selectIsOpenedMenuItem(menuItem).pipe(take(1));
    isOpened$.subscribe((isOpened: boolean) => {
      isOpened ? this.dispatchClosedMenuItem(menuItem) : this.dispatchOpenedMenuItem(menuItem);
    });
  }

  public dispatchOpenedMenuItem(menuItem: MenuItem): void {
    this.store.dispatch(menuItemActions.setOpenedIds({ ids: [menuItem.id] }));
  }

  public dispatchMenuItemClickAction(menuItem: MenuItem): void {
    this.store.dispatch({ type: menuItem.clickAction });
  }

  public dispatchClosedMenuItem(menuItem: MenuItem): void {
    this.store.dispatch(menuItemActions.removeOpenedId({ id: menuItem.id }));
  }

  public dispatchCloseAll(): void {
    this.store.dispatch(menuItemActions.setOpenedIds({ ids: [] }));
  }

  public selectIsOpenedMenuItem(menuItem: any): Observable<boolean> {
    return this.store.pipe(select(menuItemSelectors.selectIsOpenedId, { id: menuItem.id }));
  }
}
