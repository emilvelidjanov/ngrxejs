import { Action, createReducer } from '@ngrx/store';

import { editorDomainStateConfig, Editors } from './editor.state';

const reducer = createReducer(
  editorDomainStateConfig.getInitialState(),
  ...editorDomainStateConfig.getReducerFunctions(),
);

export function editorsReducer(state: Editors | undefined, action: Action) {
  return reducer(state, action);
}
