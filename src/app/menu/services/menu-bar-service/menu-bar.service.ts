import { EntityPartial } from 'src/app/core/ngrx/entity/entity';

import { MenuBar } from '../../store/menu-bar/menu-bar.state';

export interface MenuBarService {
  createFromPartial(partial: EntityPartial<MenuBar>): MenuBar;
  addMany(menuBars: MenuBar[]): void;
}
