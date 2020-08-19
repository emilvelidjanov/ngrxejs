import { ActionCreator } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

import { Entity } from '../entity';

import {
  PropEntities,
  PropEntity,
  PropEntityMap,
  PropId,
  PropIds,
  PropPartial,
  PropPredicate,
  PropUpdate,
  PropUpdates,
  PropUpdatesSame,
} from './props';

export interface EntityDomainActions<T extends Entity> {
  addOne: EntityActionCreator<T>;
  addMany: EntitiesActionCreator<T>;
  setOne: EntityActionCreator<T>;
  setAll: EntitiesActionCreator<T>;
  removeOne: IdActionCreator;
  removeMany: IdsActionCreator;
  removeByPredicate: PredicateActionCreator<T>;
  removeAll: DefaultActionCreator;
  updateOne: UpdateActionCreator<T>;
  updateMany: UpdatesActionCreator<T>;
  updateManySame: UpdatesSameActionCreator<T>;
  updateAll: UpdateAll<T>;
  upsertOne: EntityActionCreator<T>;
  upsertMany: EntitiesActionCreator<T>;
  map: EntityMapActionCreator<T>;
}

export type EntityActionCreator<T extends Entity> = ActionCreator<string, (props: PropEntity<T>) => PropEntity<T> & TypedAction<string>>;
export type EntitiesActionCreator<T extends Entity> = ActionCreator<string, (props: PropEntities<T>) => PropEntities<T> & TypedAction<string>>;
export type IdActionCreator = ActionCreator<string, (props: PropId) => PropId & TypedAction<string>>;
export type IdsActionCreator = ActionCreator<string, (props: PropIds) => PropIds & TypedAction<string>>;
export type PredicateActionCreator<T extends Entity> = ActionCreator<string, (props: PropPredicate<T>) => PropPredicate<T> & TypedAction<string>>;
export type DefaultActionCreator = ActionCreator<string, () => TypedAction<string>>;
export type UpdateActionCreator<T extends Entity> = ActionCreator<string, (props: PropUpdate<T>) => PropUpdate<T> & TypedAction<string>>;
export type UpdatesActionCreator<T extends Entity> = ActionCreator<string, (props: PropUpdates<T>) => PropUpdates<T> & TypedAction<string>>;
export type UpdatesSameActionCreator<T extends Entity> = ActionCreator<
  string,
  (props: PropUpdatesSame<T>) => PropUpdatesSame<T> & TypedAction<string>
>;
export type UpdateAll<T extends Entity> = ActionCreator<string, (props: PropPartial<T>) => PropPartial<T> & TypedAction<string>>;
export type EntityMapActionCreator<T extends Entity> = ActionCreator<string, (props: PropEntityMap<T>) => PropEntityMap<T> & TypedAction<string>>;
