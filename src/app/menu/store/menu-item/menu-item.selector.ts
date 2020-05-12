import { menuItemStoreConfig } from './menu-item.state';
import { selectMenuItems } from '..';


const defSelectors = {...menuItemStoreConfig.getSelectors(selectMenuItems)};

export const menuItemSelectors = {
  ...defSelectors,
};
