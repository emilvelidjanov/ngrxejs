import { Menu } from '../../store/menu/menu.state';

export interface MenuService {
  addMenu(menu: Menu): void;
}
