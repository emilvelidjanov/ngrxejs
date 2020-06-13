import { Action, createReducer, on } from '@ngrx/store';
import { Id } from 'src/app/core/ngrx/entity-configurer/entity';
import { PropId } from 'src/app/core/ngrx/entity-configurer/entity-state-configurer';

import { directoryActions } from './directory.actions';
import { Directories, directoryEntityStateConfig } from './directory.state';

const reducer = createReducer(
  directoryEntityStateConfig.getInitialState(),
  ...directoryEntityStateConfig.getReducerFunctions(),
  on(directoryActions.addLoadedDirectoryId, (state: Directories, props: PropId) => {
    return { ...state, loadedDirectoryIds: [...state.loadedDirectoryIds, props.id] };
  }),
  on(directoryActions.addOpenedDirectoryId, (state: Directories, props: PropId) => {
    return { ...state, openedDirectoryIds: [...state.openedDirectoryIds, props.id] };
  }),
  on(directoryActions.removeOpenedDirectoryId, (state: Directories, props: PropId) => {
    return { ...state, openedDirectoryIds: state.openedDirectoryIds.filter((id: Id) => id !== props.id) };
  }),
);

export function directoriesReducer(state: Directories | undefined, action: Action) {
  return reducer(state, action);
}
