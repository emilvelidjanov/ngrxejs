import { selectMenus } from '..';

import { menuAppStateConfig, menuDomainStateConfig } from './menu.state';

const defSelectors = { ...menuDomainStateConfig.getSelectors(selectMenus) };
const defAppSelectors = { ...menuAppStateConfig.getSelectors(selectMenus, defSelectors) };

export const menuSelectors = {
  ...defSelectors,
  ...defAppSelectors,
};
