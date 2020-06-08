import { Action, createReducer, on } from '@ngrx/store';
import { Id } from 'src/app/core/ngrx/entity';
import { PropId } from 'src/app/core/ngrx/store-configurer';

import { directoryActions } from './directory.actions';
import { Directories, directoryStoreConfig } from './directory.state';

const reducer = createReducer(
  directoryStoreConfig.getInitialState(),
  ...directoryStoreConfig.getReducerFunctions(),
  on(directoryActions.addLoadedDirectoryId, (state: Directories, props: PropId) => {
    return { ...state, loadedDirectoryIds: [...state.loadedDirectoryIds, props.id] };
  }),
  on(directoryActions.toggleOpenedDirectoryId, (state: Directories, props: PropId) => {
    return {
      ...state,
      openedDirectoryIds: state.openedDirectoryIds.includes(props.id)
        ? state.openedDirectoryIds.filter((id: Id) => id !== props.id)
        : [...state.openedDirectoryIds, props.id],
    };
  }),
);

export function directoriesReducer(state: Directories | undefined, action: Action) {
  return reducer(state, action);
}
