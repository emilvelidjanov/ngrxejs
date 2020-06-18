import { selectMenuItems } from '..';

import { menuItemAppStateConfig, menuItemDomainStateConfig } from './menu-item.state';

const defSelectors = { ...menuItemDomainStateConfig.getSelectors(selectMenuItems) };
const defAppSelectors = { ...menuItemAppStateConfig.getSelectors(selectMenuItems, defSelectors) };

export const menuItemSelectors = {
  ...defSelectors,
  ...defAppSelectors,
};
