import { ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AppState } from './app/app.state';
import * as fromMenu from '../menu/store/reducers';


export const reducers: ActionReducerMap<AppState> = {};
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

// Menu
export const selectMenuFeature = createFeatureSelector<fromMenu.State>(fromMenu.menuFeatureKey);
export const selectMenu = createSelector(selectMenuFeature, fromMenu.selectMenu);