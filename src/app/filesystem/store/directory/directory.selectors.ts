import { selectDirectories } from '..';

import { directoryDomainStateConfig } from './directory.state';

const defSelectors = { ...directoryDomainStateConfig.getSelectors(selectDirectories) };

export const directorySelectors = {
  ...defSelectors,
};
