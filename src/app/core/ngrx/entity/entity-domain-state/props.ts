import { EntityMap, Predicate, Update } from '@ngrx/entity/src/models';

import { Entity, Id } from '../entity';

export interface PropEntity<EntityType extends Entity> {
  entity: EntityType;
}

export interface PropEntities<EntityType extends Entity> {
  entities: EntityType[];
}

export interface PropId {
  id: Id;
}

export interface PropIds {
  ids: Id[];
}

export interface PropPredicate<EntityType extends Entity> {
  predicate: Predicate<EntityType>;
}

export interface PropUpdate<EntityType extends Entity> {
  update: Update<EntityType>;
}

export interface PropUpdates<EntityType extends Entity> {
  updates: Update<EntityType>[];
}

export interface PropEntityMap<EntityType extends Entity> {
  entityMap: EntityMap<EntityType>;
}

export interface PropHtmlNodeName {
  htmlNodeName: string;
}
