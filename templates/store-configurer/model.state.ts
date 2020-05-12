import { EntityState } from '@ngrx/entity';
import { Entity, Id } from 'src/app/core/ngrx/entity';
import { StoreConfigurer } from 'src/app/core/ngrx/store-configurer';


export interface Models extends EntityState<Model> { }

export interface Model extends Entity { }

export const entityName: string = "Model";

const initialState: Models = {
  ids: [],
  entities: {},
}

export const modelStoreConfig: StoreConfigurer<Model, Models> = new StoreConfigurer(entityName, initialState);