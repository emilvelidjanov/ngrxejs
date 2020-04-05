import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { MenuState } from '../state/menu.state';
import { reducer } from './menu.reducer';


export const menuFeatureKey: string = 'menu';

export interface MenuModuleState {
  menu: MenuState;
}

export const reducers: ActionReducerMap<MenuModuleState> = {
  menu: reducer
};
export const metaReducers: MetaReducer<MenuModuleState>[] = !environment.production ? [] : [];