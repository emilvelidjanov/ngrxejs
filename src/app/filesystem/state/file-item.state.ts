//TODO: File Level instead?
export interface FileItemState {
  path: string;
  name: string;
  isDirectory: boolean;
  children: FileItemState[];
}