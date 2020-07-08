import { selectMenus } from '..';

import { menuBarDomainStateConfig } from './menu-bar.state';

const defSelectors = { ...menuBarDomainStateConfig.getSelectors(selectMenus) };

export const menuBarSelectors = {
  ...defSelectors,
};
