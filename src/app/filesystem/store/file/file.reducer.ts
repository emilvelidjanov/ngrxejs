import { Action, createReducer, on } from '@ngrx/store';
import { PropId } from 'src/app/core/ngrx/store-configurer';

import { fileActions } from './file.actions';
import { Files, fileStoreConfig } from './file.state';

const reducer = createReducer(
  fileStoreConfig.getInitialState(),
  ...fileStoreConfig.getReducerFunctions(),
  on(fileActions.addLoadedFileId, (state: Files, props: PropId) => {
    return { ...state, loadedFileIds: [...state.loadedFileIds, props.id] };
  }),
  on(fileActions.setOpenedFileId, (state: Files, props: PropId) => {
    return { ...state, openedFileIds: [props.id] };
  }),
);

export function filesReducer(state: Files | undefined, action: Action) {
  return reducer(state, action);
}
