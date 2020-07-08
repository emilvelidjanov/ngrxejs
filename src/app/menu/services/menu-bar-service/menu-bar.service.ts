import { MenuBar } from '../../store/menu-bar/menu-bar.state';

export interface MenuBarService {
  populateOptionals(menuBars: MenuBar[]): MenuBar[];
  addMany(menuBars: MenuBar[]): void;
}
