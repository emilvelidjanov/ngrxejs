import { selectMenus } from '..';

import { menuEntityStateConfig } from './menu.state';

const defSelectors = { ...menuEntityStateConfig.getSelectors(selectMenus) };

export const menuSelectors = {
  ...defSelectors,
};
