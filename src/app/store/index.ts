import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';

import { AppState } from './app/app.state';

export const reducers: ActionReducerMap<AppState> = {};
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
