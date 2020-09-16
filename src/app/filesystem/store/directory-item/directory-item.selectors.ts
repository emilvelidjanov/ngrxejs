import { selectDirectoryItems } from '..';

import { directoryItemDomainStateConfig } from './directory-item.state';

const defSelectors = { ...directoryItemDomainStateConfig.getSelectors(selectDirectoryItems) };

export const directoryItemSelectors = {
  ...defSelectors,
};
