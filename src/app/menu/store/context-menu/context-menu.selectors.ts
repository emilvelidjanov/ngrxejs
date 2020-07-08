import { selectContextMenus } from '..';

import { contextMenuDomainStateConfig } from './context-menu.state';

const defSelectors = { ...contextMenuDomainStateConfig.getSelectors(selectContextMenus) };

export const contextMenuSelectors = {
  ...defSelectors,
};
