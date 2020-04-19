import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';


export interface Files extends EntityState<File> {
  selectedFileIds: number[],
}

export interface File {
  id: number,
  path: string,
  name: string,
  extension: string,
  isDirectory: boolean,
  fileIds: number[],
}

export const fileAdapter: EntityAdapter<File> = createEntityAdapter<File>();
export const filesInitialState: Files = fileAdapter.getInitialState({
  selectedFileIds: [],
});