import { menuStoreConfig } from './menu.state';
import { selectMenus } from '..';


const defSelectors = {...menuStoreConfig.getSelectors(selectMenus)};

export const menuSelectors = {
  ...defSelectors,
};
