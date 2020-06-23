import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { menuActions } from '../../store/menu/menu.actions';
import { Menu, Menus } from '../../store/menu/menu.state';

import { MenuService } from './menu.service';

@Injectable()
export class DefaultMenuService implements MenuService {
  constructor(private store: Store<Menus>) {}

  public addMany(menus: Menu[]): void {
    this.store.dispatch(menuActions.addMany({ entities: menus }));
  }

  public open(menuId: Id): void {
    this.store.dispatch(menuActions.setOpenedIds({ ids: [menuId] }));
  }

  public updatePosition(menuId: Id, x: number, y: number): void {
    this.store.dispatch(
      menuActions.updateOne({
        update: {
          id: menuId as string,
          changes: {
            x,
            y,
          },
        },
      }),
    );
  }

  public close(menuId: Id): void {
    this.store.dispatch(menuActions.removeOpenedId({ id: menuId }));
  }
}
