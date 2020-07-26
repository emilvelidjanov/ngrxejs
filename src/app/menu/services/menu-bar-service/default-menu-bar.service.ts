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

  public addMany(menuBars: MenuBar[]): void {
    this.store.dispatch(menuBarActions.addMany({ entities: menuBars }));
  }
}
