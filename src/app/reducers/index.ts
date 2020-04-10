import { ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AppState } from '../state/app.state';
import * as fromMenu from '../menu/reducers';


export const reducers: ActionReducerMap<AppState> = {};
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectMenuFeature = createFeatureSelector<fromMenu.State>(fromMenu.menuFeatureKey);
export const selectMenu = createSelector(selectMenuFeature, fromMenu.selectMenu);