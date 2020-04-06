import { createAction, props } from '@ngrx/store';
import { MenuState } from '../state/menu.state';


export const setMenu = createAction(
  '[Menu] Set Menu',
  props<MenuState>()
)