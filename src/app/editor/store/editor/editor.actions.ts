import { createAction, props } from '@ngrx/store';
import { PropEntity, PropId } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { Editor, editorDomainStateConfig } from './editor.state';

export const editorActions = {
  ...editorDomainStateConfig.getActions(),
  onClick: createAction(editorDomainStateConfig.getEffectActionType('On Click'), props<PropEntity<Editor>>()),
  openFile: createAction(editorDomainStateConfig.getEffectActionType('Open File'), props<PropId>()),
};
