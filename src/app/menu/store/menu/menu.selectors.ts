import { selectMenus } from '..';

import { menuDomainStateConfig } from './menu.state';

const defSelectors = { ...menuDomainStateConfig.getSelectors(selectMenus) };

export const menuSelectors = {
  ...defSelectors,
};
