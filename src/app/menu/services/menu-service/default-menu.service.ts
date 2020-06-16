import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { menuActions } from '../../store/menu/menu.actions';
import { Menu, Menus } from '../../store/menu/menu.state';

import { MenuService } from './menu.service';

@Injectable()
export class DefaultMenuService implements MenuService {
  constructor(private store: Store<Menus>) {}

  public addMenu(menu: Menu): void {
    this.store.dispatch(menuActions.addOne({ entity: menu }));
  }
}
