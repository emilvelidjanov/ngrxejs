import { modelStoreConfig } from './model.state';
import { createAction, props } from '@ngrx/store';
import { PropIds } from 'src/app/core/ngrx/store-configurer';


export const modelActions = {
  ...modelStoreConfig.getActions(),
  /** Custom action definitions */
  setSelectedModelIds: createAction(modelStoreConfig.getActionType("Set Selected Model Ids"), props<PropIds>()),
};