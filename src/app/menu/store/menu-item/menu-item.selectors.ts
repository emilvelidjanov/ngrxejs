import { selectMenuItems } from '..';

import { menuItemEntityStateConfig } from './menu-item.state';

const defSelectors = { ...menuItemEntityStateConfig.getSelectors(selectMenuItems) };

export const menuItemSelectors = {
  ...defSelectors,
};
