import { EntityState } from '@ngrx/entity';
import { Entity, Id } from 'src/app/core/ngrx/entity';
import { defaultInitialEntityAppState, EntityAppState } from 'src/app/core/ngrx/entity-app-state';
import { StoreConfigurer } from 'src/app/core/ngrx/store-configurer';

export interface Directories extends EntityState<Directory>, EntityAppState {
  loadedDirectoryIds: Id[];
  openedDirectoryIds: Id[];
}

export interface Directory extends Entity {
  path: string;
  name: string;
  fileIds: Id[];
  directoryIds: Id[];
}

export const entityName = 'Directory';

const initialState: Directories = {
  ...defaultInitialEntityAppState,
  ids: [],
  entities: {},
  loadedDirectoryIds: [],
  openedDirectoryIds: [],
};

export const directoryStoreConfig: StoreConfigurer<Directory, Directories> = new StoreConfigurer(
  entityName,
  initialState,
);
