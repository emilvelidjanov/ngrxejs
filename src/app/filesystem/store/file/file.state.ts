import { EntityState } from '@ngrx/entity';
import { Entity, Id } from 'src/app/core/ngrx/entity';
import { StoreConfigurer } from 'src/app/core/ngrx/store-configurer';


export interface Files extends EntityState<File> {
}

export interface File extends Entity {
  path: string,
  name: string,
  extension: string,
  isDirectory: boolean,
  isDirectoryLoaded: boolean,
  fileIds: Id[],
}

export const entityName: string = "File";

const initialState: Files = {
  ids: [],
  entities: {},
}

export const fileStoreConfig: StoreConfigurer<File, Files> = new StoreConfigurer(
  entityName,
  initialState,
);