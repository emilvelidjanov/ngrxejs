import { EntityState } from '@ngrx/entity';
import { Entity, EntityAppState, Id } from 'src/app/core/ngrx/entity';
import { StoreConfigurer } from 'src/app/core/ngrx/store-configurer';

export interface Files extends EntityState<File>, EntityAppState {
  loadedDirectoryIds: Id[];
  openedDirectoryIds: Id[];
}

export interface File extends Entity {
  path: string;
  name: string;
  extension: string;
  isDirectory: boolean;
  fileIds: Id[];
}

export const entityName = 'File';

const initialState: Files = {
  ids: [],
  entities: {},
  loadedDirectoryIds: [],
  openedDirectoryIds: [],
};

export const fileStoreConfig: StoreConfigurer<File, Files> = new StoreConfigurer(entityName, initialState);
