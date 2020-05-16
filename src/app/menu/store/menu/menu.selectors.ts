import { selectMenus } from '..';

import { menuStoreConfig } from './menu.state';

const defSelectors = { ...menuStoreConfig.getSelectors(selectMenus) };

export const menuSelectors = {
  ...defSelectors,
};
