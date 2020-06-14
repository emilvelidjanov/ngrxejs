import { selectFiles } from '..';

import { fileEntityAppStateConfig, fileEntityStateConfig } from './file.state';

const defSelectors = { ...fileEntityStateConfig.getSelectors(selectFiles) };
const defAppSelectors = { ...fileEntityAppStateConfig.getSelectors(selectFiles, defSelectors) };

export const fileSelectors = {
  ...defSelectors,
  ...defAppSelectors,
};
