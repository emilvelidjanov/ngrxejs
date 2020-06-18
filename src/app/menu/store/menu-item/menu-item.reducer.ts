import { Action, createReducer } from '@ngrx/store';

import { menuItemAppStateConfig, menuItemDomainStateConfig, MenuItems } from './menu-item.state';

const reducer = createReducer(
  menuItemDomainStateConfig.getInitialState(),
  ...menuItemDomainStateConfig.getReducerFunctions(),
  ...menuItemAppStateConfig.getReducerFunctions(),
);

export function menuItemsReducer(state: MenuItems | undefined, action: Action) {
  return reducer(state, action);
}
