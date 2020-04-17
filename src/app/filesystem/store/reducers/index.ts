import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { FileTreeState } from '../state/file-tree.state';
import { reducer } from './file-tree.reducer';


export const filesystemFeatureKey = 'filesystem';

export interface State {
  fileTree: FileTreeState
}

export const reducers: ActionReducerMap<State> = {
  fileTree: reducer
};
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectFileTree = (state: State) => state.fileTree;