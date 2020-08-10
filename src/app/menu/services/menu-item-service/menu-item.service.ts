import { EntityPartial } from 'src/app/core/ngrx/entity/entity';

import { MenuItem } from '../../store/menu-item/menu-item.state';

export interface MenuItemService {
  createFromPartial(partial: EntityPartial<MenuItem>): MenuItem;
  addMany(menuItems: MenuItem[]): void;
  open(menuItem: MenuItem): void;
  toggleOpened(menuItem: MenuItem): void;
  closeAll(): void;
  dispatchClickAction(menuItem: MenuItem): void;
  updateIsDisabled(isDisabled: boolean, menuItem: MenuItem): void;
}
