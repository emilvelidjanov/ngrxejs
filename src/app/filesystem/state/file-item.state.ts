export interface FileItemState {
  path: string; //TODO: set it on parent only?
  name: string;
  isDirectory: boolean;
  children: FileItemState[];
}