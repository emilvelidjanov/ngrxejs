import { selectFileItems } from '..';

import { fileItemDomainStateConfig } from './file-item.state';

const defSelectors = { ...fileItemDomainStateConfig.getSelectors(selectFileItems) };

export const fileItemSelectors = {
  ...defSelectors,
};
