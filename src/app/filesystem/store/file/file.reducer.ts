import { Files, fileStoreConfig } from './file.state';
import { createReducer, Action, on } from '@ngrx/store';
import { fileActions } from './file.action';


const reducer = createReducer(
  fileStoreConfig.getInitialState(),
  ...fileStoreConfig.getReducerFunctions(),
  on(fileActions.addLoadedDirectoryId, (state: Files, { id }) => {
    return { ...state, loadedDirectoryIds: [...state.loadedDirectoryIds, id] };
  }),
);

export function filesReducer(state: Files | undefined, action: Action) {
  return reducer(state, action);
}