import { createAction, props } from '@ngrx/store';
import { PropId } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { menuAppStateConfig, menuDomainStateConfig } from './menu.state';

export const menuActions = {
  ...menuDomainStateConfig.getActions(),
  ...menuAppStateConfig.getActions(),
  close: createAction(menuAppStateConfig.getActionType('Close'), props<PropId>()),
};
