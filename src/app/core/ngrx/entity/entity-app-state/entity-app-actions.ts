import { IdActionCreator, IdsActionCreator } from '../entity-domain-state/entity-domain-actions';

export interface EntityAppActions {
  addLoadedId?: IdActionCreator;
  addOpenedId?: IdActionCreator;
  removeOpenedId?: IdActionCreator;
  setOpenedIds?: IdsActionCreator;
  setFocusedId?: IdActionCreator;
}
