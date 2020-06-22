import { menuAppStateConfig, menuDomainStateConfig } from './menu.state';

export const menuActions = {
  ...menuDomainStateConfig.getActions(),
  ...menuAppStateConfig.getActions(),
};
