import { EntityMap, Predicate, UpdateNum, UpdateStr } from '@ngrx/entity/src/models';

import { Entity, Id } from '../entity';

export interface PropEntity<T extends Entity> {
  entity: T;
}

export interface PropEntities<T extends Entity> {
  entities: T[];
}

export interface PropId {
  id: Id;
}

export interface PropIds {
  ids: Id[];
}

export interface PropPredicate<T extends Entity> {
  predicate: Predicate<T>;
}

export interface UpdateId<T> {
  id: Id;
  changes: Partial<T>;
}
export type Update<T> = UpdateId<T> | UpdateStr<T> | UpdateNum<T>;
export interface PropUpdate<T extends Entity> {
  update: Update<T>;
}

export interface PropUpdates<T extends Entity> {
  updates: Update<T>[];
}

export interface PropUpdatesSame<T extends Entity> extends PropIds, PropPartial<T> {}

export interface PropPartial<T extends Entity> {
  partial: Partial<T>;
}

export interface PropEntityMap<T extends Entity> {
  entityMap: EntityMap<T>;
}

export interface PropCoordinates {
  x: number;
  y: number;
}
