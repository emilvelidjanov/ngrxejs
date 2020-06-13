import { EntityState } from '@ngrx/entity';
import { Entity, Id } from 'src/app/core/ngrx/entity-configurer/entity';
import { defaultInitialEntityAppState, EntityAppState } from 'src/app/core/ngrx/entity-configurer/entity-app-state';
import { EntityStateConfigurer } from 'src/app/core/ngrx/entity-configurer/entity-state-configurer';

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

export const fileEntityStateConfig: EntityStateConfigurer<File, Files> = new EntityStateConfigurer(
  entityName,
  initialState,
);
