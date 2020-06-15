import { Action, createReducer } from '@ngrx/store';

import { Editor, editorAppStateConfig } from './editor.state';

const reducer = createReducer(editorAppStateConfig.getInitialState(), ...editorAppStateConfig.getReducerFunctions());

export function editorReducer(state: Editor | undefined, action: Action) {
  return reducer(state, action);
}
