import { selectFiles } from '..';

import { fileStoreConfig } from './file.state';

const defSelectors = { ...fileStoreConfig.getSelectors(selectFiles) };

export const fileSelectors = {
  ...defSelectors,
};
