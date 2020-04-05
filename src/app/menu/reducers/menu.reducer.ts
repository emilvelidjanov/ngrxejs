import { Action, createReducer, on } from '@ngrx/store';
import { MenuState, initialState } from '../state/menu.state';
import { getMenu } from "../actions/menu.actions";


const menuReducer = createReducer(
  initialState,
  on(getMenu, state => state)
);

export function reducer(state: MenuState | undefined, action: Action) {
  return menuReducer(state, action);
}
