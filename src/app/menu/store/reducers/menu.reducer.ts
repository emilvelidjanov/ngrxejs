import { Action, createReducer, on } from '@ngrx/store';
import { MenuState, initialState } from '../state/menu.state';
import { setMenu } from '../actions/menu.actions';


const menuReducer = createReducer(
  initialState,
  on(setMenu, (state: MenuState, menu: MenuState) => {
    return {...menu};
  })
);

export function reducer(state: MenuState | undefined, action: Action) {
  return menuReducer(state, action);
}
