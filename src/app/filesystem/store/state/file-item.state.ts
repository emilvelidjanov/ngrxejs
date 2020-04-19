import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";


export interface FileItems extends EntityState<FileItem> {
  selectedFileItems: number[],
}

export interface FileItem {
  fileId: number,
  fileItemIds: number[],
}

export const fileItemAdapter: EntityAdapter<FileItem> = createEntityAdapter<FileItem>();
export const fileItemsInitialState: FileItems = fileItemAdapter.getInitialState({
  selectedFileItems: []
});