import { EntityState } from '@ngrx/entity';
import { Entity, Id } from 'src/app/core/ngrx/entity';
import { defaultInitialEntityAppState, EntityAppState } from 'src/app/core/ngrx/entity-app-state';
import { StoreConfigurer } from 'src/app/core/ngrx/store-configurer';

export interface Files extends EntityState<File>, EntityAppState {
  loadedFileIds: Id[];
  openedFileIds: Id[];
  focusedFileId: Id;
}

export interface File extends Entity {
  path: string;
  name: string;
  extension: string;
  content: string;
}

export const entityName = 'File';

const initialState: Files = {
  ...defaultInitialEntityAppState,
  ids: [],
  entities: {},
  loadedFileIds: [],
  openedFileIds: [],
  focusedFileId: null,
};

export const fileStoreConfig: StoreConfigurer<File, Files> = new StoreConfigurer(entityName, initialState);
