import { Action, createReducer } from '@ngrx/store';

import { menuItemEntityStateConfig, MenuItems } from './menu-item.state';

const reducer = createReducer(
  menuItemEntityStateConfig.getInitialState(),
  ...menuItemEntityStateConfig.getReducerFunctions(),
);

export function menuItemsReducer(state: MenuItems | undefined, action: Action) {
  return reducer(state, action);
}
