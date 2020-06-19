import { Menu } from '../../store/menu/menu.state';

export interface MenuService {
  addMany(menus: Menu[]): void;
}
