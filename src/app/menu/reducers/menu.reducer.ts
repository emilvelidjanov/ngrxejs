import { Action, createReducer, on, State } from '@ngrx/store';
import { MenuState, initialState } from '../state/menu.state';
import * as MenuActions from '../actions/menu.actions';


const menuReducer = createReducer(
  initialState,
  on(MenuActions.setMenu, (_state: MenuState, menu: MenuState) => {
    return {...menu};
  })
);

export function reducer(state: MenuState | undefined, action: Action) {
  return menuReducer(state, action);
}
