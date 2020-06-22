import { createAction, props } from '@ngrx/store';
import { PropEntity, PropHtmlNodeName } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { MenuItem, menuItemAppStateConfig, menuItemDomainStateConfig } from './menu-item.state';

export const menuItemActions = {
  ...menuItemDomainStateConfig.getActions(),
  ...menuItemAppStateConfig.getActions(),
  click: createAction(menuItemAppStateConfig.getActionType('Click'), props<PropEntity<MenuItem>>()),
  offClick: createAction(menuItemAppStateConfig.getActionType('Off Click'), props<PropHtmlNodeName>()),
};
