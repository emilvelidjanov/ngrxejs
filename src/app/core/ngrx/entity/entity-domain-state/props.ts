import { EntityMap, Predicate, UpdateNum, UpdateStr } from '@ngrx/entity/src/models';
import { CreateNewInputType } from 'src/app/filesystem/store/directory-item/directory-item.state';

import { Entity, Id } from '../entity';

export interface Prop {}

export interface PropEntity<T extends Entity> extends Prop {
  entity: T;
}

export interface PropEntities<T extends Entity> extends Prop {
  entities: T[];
}

export interface PropId extends Prop {
  id: Id;
}

export interface PropIds extends Prop {
  ids: Id[];
}

export interface PropPredicate<T extends Entity> extends Prop {
  predicate: Predicate<T>;
}

export interface UpdateId<T> {
  id: Id;
  changes: Partial<T>;
}
export type Update<T> = UpdateId<T> | UpdateStr<T> | UpdateNum<T>;
export interface PropUpdate<T extends Entity> extends Prop {
  update: Update<T>;
}

export interface PropUpdates<T extends Entity> extends Prop {
  updates: Update<T>[];
}

export interface PropUpdatesSame<T extends Entity> extends PropIds, PropPartial<T>, Prop {}

export interface PropPartial<T extends Entity> extends Prop {
  partial: Partial<T>;
}

export interface PropEntityMap<T extends Entity> extends Prop {
  entityMap: EntityMap<T>;
}

// TODO: remove and use plainly in actions instead
export interface PropCoordinates extends Prop {
  x: number;
  y: number;
}

export interface GenericProp extends Prop {
  props: Prop;
}

export interface CreateNewInputTypeProp extends Prop {
  createNewInputType: CreateNewInputType;
}
