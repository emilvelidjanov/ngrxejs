import { Action, createReducer, on } from '@ngrx/store';
import { PropId } from 'src/app/core/ngrx/entity-configurer/entity-state-configurer';

import { fileActions } from './file.actions';
import { fileEntityStateConfig, Files } from './file.state';

const reducer = createReducer(
  fileEntityStateConfig.getInitialState(),
  ...fileEntityStateConfig.getReducerFunctions(),
  on(fileActions.addLoadedFileId, (state: Files, props: PropId) => {
    return { ...state, loadedFileIds: [...state.loadedFileIds, props.id] };
  }),
  on(fileActions.addOpenedFileId, (state: Files, props: PropId) => {
    return { ...state, openedFileIds: [...state.openedFileIds, props.id] };
  }),
  on(fileActions.setFocusedFileId, (state: Files, props: PropId) => {
    return { ...state, focusedFileId: props.id };
  }),
);

export function filesReducer(state: Files | undefined, action: Action) {
  return reducer(state, action);
}
