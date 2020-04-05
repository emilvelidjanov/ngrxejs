import { ActionReducerMap, MetaReducer, createFeatureSelector } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AppState } from '../state/app.state';


export const reducers: ActionReducerMap<AppState> = {};
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];