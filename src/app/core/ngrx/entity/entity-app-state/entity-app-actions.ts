import { IdActionCreator, IdsActionCreator } from '../entity-domain-state/entity-domain-actions';

export interface EntityAppActions {
  addLoadedId?: IdActionCreator;
  removeLoadedId?: IdActionCreator;
  setLoadedIds?: IdsActionCreator;
  insertLoadedId?: IdActionCreator;
  addOpenedId?: IdActionCreator;
  removeOpenedId?: IdActionCreator;
  setOpenedIds?: IdsActionCreator;
  insertOpenedId?: IdActionCreator;
  toggleOpenedId?: IdActionCreator;
  setFocusedId?: IdActionCreator;
}
