import { selectDirectoryItems } from '..';

import { directoryDomainStateConfig } from './directory-item.state';

const defSelectors = { ...directoryDomainStateConfig.getSelectors(selectDirectoryItems) };

export const directoryItemSelectors = {
  ...defSelectors,
};
