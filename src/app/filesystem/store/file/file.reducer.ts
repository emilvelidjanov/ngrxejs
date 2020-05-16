import { Action, createReducer, on } from '@ngrx/store';
import { Id } from 'src/app/core/ngrx/entity';
import { PropId } from 'src/app/core/ngrx/store-configurer';

import { fileActions } from './file.actions';
import { Files, fileStoreConfig } from './file.state';

const reducer = createReducer(
  fileStoreConfig.getInitialState(),
  ...fileStoreConfig.getReducerFunctions(),
  on(fileActions.addLoadedDirectoryId, (state: Files, props: PropId) => {
    return { ...state, loadedDirectoryIds: [...state.loadedDirectoryIds, props.id] };
  }),
  on(fileActions.toggleOpenedDirectoryId, (state: Files, props: PropId) => {
    return {
      ...state,
      openedDirectoryIds: state.openedDirectoryIds.includes(props.id)
        ? state.openedDirectoryIds.filter((id: Id) => id !== props.id)
        : [...state.openedDirectoryIds, props.id],
    };
  }),
);

export function filesReducer(state: Files | undefined, action: Action) {
  return reducer(state, action);
}
