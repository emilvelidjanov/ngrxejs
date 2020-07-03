import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { Menu } from '../../store/menu/menu.state';

export interface MenuService {
  select(id: Id): Observable<Menu>;
  populateOptionals(menus: Menu[]): Menu[];
  addMany(menus: Menu[]): void;
  open(menu: Menu): void;
  updatePosition(menu: Menu, x: number, y: number): void;
  closeAll(): void;
  close(menu: Menu): void;
}
