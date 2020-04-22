import { Files, fileStoreConfig } from './file.state';
import { createReducer, Action, on } from '@ngrx/store';
import { fileActions } from './file.action';


const filesInitialState = fileStoreConfig.getInitialState();
const fileAdapter = fileStoreConfig.getAdapter();

const reducer = createReducer(
  filesInitialState,
  on(fileActions.addOne, (state: Files, {entity}) => {
    return fileAdapter.addOne(entity, state);
  }),
  on(fileActions.addMany, (state: Files, {entities}) => {
    return fileAdapter.addMany(entities, state);
  }),
);

export function filesReducer(state: Files | undefined, action: Action) {
  return reducer(state, action);
}