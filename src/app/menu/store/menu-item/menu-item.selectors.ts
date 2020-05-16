import { selectMenuItems } from '..';

import { menuItemStoreConfig } from './menu-item.state';

const defSelectors = { ...menuItemStoreConfig.getSelectors(selectMenuItems) };

export const menuItemSelectors = {
  ...defSelectors,
};
