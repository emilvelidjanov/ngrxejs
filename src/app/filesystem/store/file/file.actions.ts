import { fileAppStateConfig, fileDomainStateConfig } from './file.state';

export const fileActions = {
  ...fileDomainStateConfig.getActions(),
  ...fileAppStateConfig.getActions(),
};
