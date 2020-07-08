import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { menuBarActions } from '../../store/menu-bar/menu-bar.actions';
import { MenuBar, MenuBars } from '../../store/menu-bar/menu-bar.state';

import { MenuBarService } from './menu-bar.service';

@Injectable()
export class DefaultMenuBarService implements MenuBarService {
  constructor(private store: Store<MenuBars>) {}

  public populateOptionals(menuBars: MenuBar[]): MenuBar[] {
    const result: MenuBar[] = menuBars.map((menuBar: MenuBar) => {
      if (menuBar.title === undefined) {
        menuBar.title = null;
      }
      if (menuBar.image === undefined) {
        menuBar.image = null;
      }
      return { ...menuBar };
    });
    return result;
  }

  public addMany(menuBars: MenuBar[]): void {
    this.store.dispatch(menuBarActions.addMany({ entities: menuBars }));
  }
}
