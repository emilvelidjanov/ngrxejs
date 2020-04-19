import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';


export interface Files extends EntityState<File> {
}

export interface File {
  path: string,
  name: string,
  extension: string,
  isDirectory: boolean,
  fileIds: number[],
}

export const fileAdapter: EntityAdapter<File> = createEntityAdapter<File>();
export const filesInitialState: Files = fileAdapter.getInitialState();