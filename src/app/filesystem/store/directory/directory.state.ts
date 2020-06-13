import { EntityState } from '@ngrx/entity';
import { Entity, Id } from 'src/app/core/ngrx/entity-configurer/entity';
import { defaultInitialEntityAppState, EntityAppState } from 'src/app/core/ngrx/entity-configurer/entity-app-state';
import { EntityStateConfigurer } from 'src/app/core/ngrx/entity-configurer/entity-state-configurer';

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

export const directoryEntityStateConfig: EntityStateConfigurer<Directory, Directories> = new EntityStateConfigurer(
  entityName,
  initialState,
);
