import { selectFiles } from '..';

import { fileAppStateConfig, fileDomainStateConfig } from './file.state';

const defSelectors = { ...fileDomainStateConfig.getSelectors(selectFiles) };
const defAppSelectors = { ...fileAppStateConfig.getSelectors(selectFiles, defSelectors) };

export const fileSelectors = {
  ...defSelectors,
  ...defAppSelectors,
};
