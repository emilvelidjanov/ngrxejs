import { Id } from 'src/app/core/ngrx/entity/entity';

import { Menu } from '../../store/menu/menu.state';

export interface MenuService {
  addMany(menus: Menu[]): void;
  open(menuId: Id): void;
  updatePosition(menuId: Id, x: number, y: number): void;
}
