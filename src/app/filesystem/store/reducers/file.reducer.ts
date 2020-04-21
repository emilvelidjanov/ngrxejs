import { Files, fileStoreConfig } from '../state/file.state';
import { createReducer, Action, on } from '@ngrx/store';
import * as FileActions from './../actions/file.action';


const filesInitialState = fileStoreConfig.getInitialState();
const fileAdapter = fileStoreConfig.getAdapter();

const reducer = createReducer(
  filesInitialState,
  on(FileActions.addFile, (state: Files, {file}) => {
    return fileAdapter.addOne(file, state);
  }),
  on(FileActions.addFiles, (state: Files, {files}) => {
    return fileAdapter.addMany(files, state);
  }),
);

export function filesReducer(state: Files | undefined, action: Action) {
  return reducer(state, action);
}