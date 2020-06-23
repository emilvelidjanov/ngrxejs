import { createAction, props } from '@ngrx/store';
import { PropCoordinates, PropId } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { menuAppStateConfig, menuDomainStateConfig } from './menu.state';

export const menuActions = {
  ...menuDomainStateConfig.getActions(),
  ...menuAppStateConfig.getActions(),
  closeMenu: createAction(menuAppStateConfig.getEffectActionType('Close Menu'), props<PropId>()),
  openContextMenu: createAction(
    menuAppStateConfig.getEffectActionType('Open Context Menu'),
    props<PropId & PropCoordinates>(),
  ),
};
