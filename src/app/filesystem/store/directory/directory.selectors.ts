import { selectDirectories } from '..';

import { directoryEntityAppStateConfig, directoryEntityStateConfig } from './directory.state';

const defSelectors = { ...directoryEntityStateConfig.getSelectors(selectDirectories) };
const defAppSelectors = { ...directoryEntityAppStateConfig.getSelectors(selectDirectories, defSelectors) };

export const directorySelectors = {
  ...defSelectors,
  ...defAppSelectors,
};
