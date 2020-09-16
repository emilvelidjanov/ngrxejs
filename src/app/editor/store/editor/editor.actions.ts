import { createAction, props } from '@ngrx/store';
import { PropEntity, PropId } from 'src/app/core/ngrx/entity/entity-domain-state/props';
import { File } from 'src/app/filesystem/store/file/file.state';

import { Editor, editorDomainStateConfig } from './editor.state';

export const editorActions = {
  ...editorDomainStateConfig.getActions(),
  onClick: createAction(editorDomainStateConfig.getEffectActionType('On Click'), props<PropEntity<Editor>>()),
  openFile: createAction(editorDomainStateConfig.getEffectActionType('Open File'), props<PropId>()),
  closeFile: createAction(editorDomainStateConfig.getEffectActionType('Close File'), props<PropId>()),
  syncContentToFile: createAction(
    editorDomainStateConfig.getEffectActionType('Sync Content To File'),
    props<PropEntity<File> & { content: string }>(),
  ), // TODO: pick type instead?
};
