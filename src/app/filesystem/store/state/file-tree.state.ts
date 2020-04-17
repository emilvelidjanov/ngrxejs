import { FileItemState } from './file-item.state';


export interface FileTreeState {
  loadedDirectory: string,
  items: FileItemState[]
}

export const initialState: FileTreeState = {
  loadedDirectory: '',
  items: []
}