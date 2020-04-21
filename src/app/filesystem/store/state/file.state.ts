import { EntityState } from '@ngrx/entity';
import { Entity } from 'src/app/core/ngrx/entity';
import { StoreConfigurer } from 'src/app/core/ngrx/store-configurer';


export interface Files extends EntityState<File> {
  selectedFileIds: number[],
}

export interface File extends Entity {
  path: string,
  name: string,
  extension: string,
  isDirectory: boolean,
  fileIds: number[],
}

const initialState: Files = {
  ids: [],
  entities: {},
  selectedFileIds: [],
}
export const fileStoreConfig: StoreConfigurer<File, Files> = new StoreConfigurer(
  initialState,
);