import { EntityState } from '@ngrx/entity';
import { Entity, Id } from 'src/app/core/ngrx/entity';
import { StoreConfigurer } from 'src/app/core/ngrx/store-configurer';


export interface Models extends EntityState<Model> {
  /** Application state */
  selectedModelIds: Id[],
}

export interface Model extends Entity {
  /** Domain state */
  name: string,
  date: string,
  value: number,
}

export const entityName: string = "Model";

const initialState: Models = {
  //** Initialize application state */
  ids: [],
  entities: {},
  selectedModelIds: [],
}

export const modelStoreConfig: StoreConfigurer<Model, Models> = new StoreConfigurer(
  entityName,
  initialState,
);