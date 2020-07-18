import { fileItemDomainStateConfig } from './file-item.state';

export const fileItemActions = {
  ...fileItemDomainStateConfig.getActions(),
};
