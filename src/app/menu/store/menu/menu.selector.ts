import { menuStoreConfig, Menu } from './menu.state';
import { selectMenus } from '..';
import { createSelector } from '@ngrx/store';
import { Id } from 'src/app/core/ngrx/entity';
import { menuItemSelectors } from '../menu-item/menu-item.selector';
import { Dictionary } from '@ngrx/entity';
import { MenuItem } from '../menu-item/menu-item.state';


const defSelectors = {...menuStoreConfig.getSelectors(selectMenus)};
const selectMenuItemIds = createSelector(defSelectors.selectEntityById,
  (menu: Menu) => menu.menuItemIds
);
const selectMenuItems = createSelector(selectMenuItemIds,
  menuItemSelectors.selectEntities,
  (menuItemIds: Id[], menuItems: Dictionary<MenuItem>) => menuItemIds.map((id: Id) => menuItems[id]),
);

export const menuSelectors = {
  ...defSelectors,
  selectMenuItemIds,
  selectMenuItems,
};
