import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import mainMenuBar from 'src/config/menu/mainMenuBar.json';

import { menuActions } from '../../store/menu/menu.actions';
import { Menus } from '../../store/menu/menu.state';

import { MenuService } from './menu.service';

@Injectable()
export class DefaultMenuService implements MenuService {
  constructor(private store: Store<Menus>) {}

  public initMenus(): void {
    this.store.dispatch(menuActions.addMany({ entities: [mainMenuBar] }));
  }
}
