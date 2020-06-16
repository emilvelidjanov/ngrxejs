import { selectDirectories } from '..';

import { directoryAppStateConfig, directoryDomainStateConfig } from './directory.state';

const defSelectors = { ...directoryDomainStateConfig.getSelectors(selectDirectories) };
const defAppSelectors = { ...directoryAppStateConfig.getSelectors(selectDirectories, defSelectors) };

export const directorySelectors = {
  ...defSelectors,
  ...defAppSelectors,
};
