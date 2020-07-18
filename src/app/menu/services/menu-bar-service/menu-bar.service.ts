import { MenuBar } from '../../store/menu-bar/menu-bar.state';

export interface MenuBarService {
  populateOptionals(partialMenuBars: Partial<MenuBar>[]): MenuBar[];
  addMany(menuBars: MenuBar[]): void;
}
