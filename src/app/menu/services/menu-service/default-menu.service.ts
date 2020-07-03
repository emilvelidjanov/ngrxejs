import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { menuActions } from '../../store/menu/menu.actions';
import { menuSelectors } from '../../store/menu/menu.selectors';
import { Menu, Menus } from '../../store/menu/menu.state';

import { MenuService } from './menu.service';

@Injectable()
export class DefaultMenuService implements MenuService {
  constructor(private store: Store<Menus>) {}

  public select(id: Id): Observable<Menu> {
    return this.store.pipe(select(menuSelectors.selectEntityById, { id }));
  }

  public populateOptionals(menus: Menu[]): Menu[] {
    menus.forEach((menu: Menu) => {
      if (menu.isOpened === undefined) {
        menu.isOpened = false;
      }
    });
    return [...menus];
  }

  public addMany(menus: Menu[]): void {
    this.store.dispatch(menuActions.addMany({ entities: menus }));
  }

  public open(menu: Menu): void {
    if (menu.menuItemIds && menu.menuItemIds.length) {
      this.store.dispatch(
        menuActions.updateOne({
          update: {
            id: menu.id as string,
            changes: {
              isOpened: true,
            },
          },
        }),
      );
    }
  }

  public updatePosition(menu: Menu, x: number, y: number): void {
    this.store.dispatch(
      menuActions.updateOne({
        update: {
          id: menu.id as string,
          changes: {
            x,
            y,
          },
        },
      }),
    );
  }

  public closeAll(): void {
    this.store.dispatch(
      menuActions.updateAll({
        partial: {
          isOpened: false,
        },
      }),
    );
  }

  public close(menu: Menu): void {
    this.store.dispatch(
      menuActions.updateOne({
        update: {
          id: menu.id as string,
          changes: {
            isOpened: false,
          },
        },
      }),
    );
  }
}
