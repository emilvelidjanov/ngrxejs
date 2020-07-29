import { selectTabItems } from '..';

import { tabItemDomainStateConfig } from './tab-item.state';

const defSelectors = { ...tabItemDomainStateConfig.getSelectors(selectTabItems) };

export const tabItemSelectors = {
  ...defSelectors,
};
