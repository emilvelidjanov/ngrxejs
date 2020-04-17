export interface FileItemState {
  path: string;
  name: string;
  isDirectory: boolean;
  children: FileItemState[];
}