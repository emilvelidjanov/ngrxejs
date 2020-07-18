import { selectFiles } from '..';

import { fileDomainStateConfig } from './file.state';

const defSelectors = { ...fileDomainStateConfig.getSelectors(selectFiles) };

export const fileSelectors = {
  ...defSelectors,
};
