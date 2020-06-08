import { EntityState } from '@ngrx/entity';
import { Entity, EntityAppState } from 'src/app/core/ngrx/entity';
import { StoreConfigurer } from 'src/app/core/ngrx/store-configurer';

export interface Files extends EntityState<File>, EntityAppState {}

export interface File extends Entity {
  path: string;
  name: string;
  extension: string;
  content: string;
}

export const entityName = 'File';

const initialState: Files = {
  ids: [],
  entities: {},
};

export const fileStoreConfig: StoreConfigurer<File, Files> = new StoreConfigurer(entityName, initialState);
