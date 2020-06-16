import { createAction, props } from '@ngrx/store';
import { PropEntity } from 'src/app/core/ngrx/entity/entity-domain-state/props';
import { File } from 'src/app/filesystem/store/file/file.state';

import { editorAppStateConfig } from './editor.state';

export const editorActions = {
  ...editorAppStateConfig.getActions(),
  openFile: createAction(editorAppStateConfig.getActionType('Open File'), props<PropEntity<File>>()),
  closeFile: createAction(editorAppStateConfig.getActionType('Close File'), props<PropEntity<File>>()),
};
