import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { MenuState } from '../state/menu.state';
import { reducer } from './menu.reducer';


export const menuFeatureKey: string = 'menu';

export interface State {
  menu: MenuState;
}

export const reducers: ActionReducerMap<State> = {
  menu: reducer
};
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectMenu = (state: State) => state.menu;