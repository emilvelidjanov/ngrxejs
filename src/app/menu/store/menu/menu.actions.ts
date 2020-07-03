import { createAction, props } from '@ngrx/store';
import { PropCoordinates, PropEntity } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { Menu, menuDomainStateConfig } from './menu.state';

export const menuActions = {
  ...menuDomainStateConfig.getActions(),
  close: createAction(menuDomainStateConfig.getEffectActionType('Close'), props<PropEntity<Menu>>()),
  openContextMenu: createAction(
    menuDomainStateConfig.getEffectActionType('Open Context Menu'),
    props<PropEntity<Menu> & PropCoordinates>(),
  ),
};
