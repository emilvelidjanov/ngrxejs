import { selectMenuItems } from '..';

import { menuItemDomainStateConfig } from './menu-item.state';

const defSelectors = { ...menuItemDomainStateConfig.getSelectors(selectMenuItems) };

export const menuItemSelectors = {
  ...defSelectors,
};
