import { selectTabBars } from '..';

import { tabBarDomainStateConfig } from './tab-bar.state';

const defSelectors = { ...tabBarDomainStateConfig.getSelectors(selectTabBars) };

export const tabBarSelectors = {
  ...defSelectors,
};
