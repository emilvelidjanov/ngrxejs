import { ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AppState } from '../state/app.state';
import * as fromMenu from '../menu/reducers';
import * as fromFilesystem from '../filesystem/reducers';


export const reducers: ActionReducerMap<AppState> = {};
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

// Menu
export const selectMenuFeature = createFeatureSelector<fromMenu.State>(fromMenu.menuFeatureKey);
export const selectMenu = createSelector(selectMenuFeature, fromMenu.selectMenu);

// Filesystem
export const selectFilesystemFeature = createFeatureSelector<fromFilesystem.State>(fromFilesystem.filesystemFeatureKey);
export const selectFileTree = createSelector(selectFilesystemFeature, fromFilesystem.selectFileTree);