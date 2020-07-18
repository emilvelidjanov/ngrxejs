import { directoryDomainStateConfig } from './directory.state';

export const directoryActions = {
  ...directoryDomainStateConfig.getActions(),
};
