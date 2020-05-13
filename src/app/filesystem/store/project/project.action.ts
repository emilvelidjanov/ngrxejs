import { projectStoreConfig } from './project.state';
import { createAction, props } from '@ngrx/store';
import { PropId } from 'src/app/core/ngrx/store-configurer';


export const projectActions = {
  ...projectStoreConfig.getActions(),
  setOpenProjectId: createAction(projectStoreConfig.getActionType('Set Open Project Id'), props<PropId>()),
};
