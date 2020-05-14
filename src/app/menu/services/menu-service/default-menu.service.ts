import { Injectable } from '@angular/core';
import { MenuService } from './menu.service';
import { Menus } from '../../store/menu/menu.state';
import { Store } from '@ngrx/store';
import { menuActions } from '../../store/menu/menu.actions';
import mainMenu from '../../config/mainMenu.json';


@Injectable()
export class DefaultMenuService implements MenuService {

  constructor(
    private store: Store<Menus>,
  ) { }

  initMenus(): void {
    this.store.dispatch(menuActions.addMany({entities: [mainMenu]}));
  }
}
