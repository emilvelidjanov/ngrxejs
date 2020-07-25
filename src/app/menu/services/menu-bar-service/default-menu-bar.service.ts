import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityPartial } from 'src/app/core/ngrx/entity/entity';

import { menuBarActions } from '../../store/menu-bar/menu-bar.actions';
import { MenuBar, MenuBars } from '../../store/menu-bar/menu-bar.state';

import { MenuBarService } from './menu-bar.service';

@Injectable()
export class DefaultMenuBarService implements MenuBarService {
  constructor(private store: Store<MenuBars>) {}

  public createFromPartial(partial: EntityPartial<MenuBar>): MenuBar {
    return { ...partial } as MenuBar;
  }

  public populateOptionals(partialMenuBars: Partial<MenuBar>[]): MenuBar[] {
    const result: MenuBar[] = partialMenuBars.map((menuBar: MenuBar) => {
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
