export interface FilesystemService {

  debugCounter: number;
  debug(): void;

  //TODO?: fix typing (web & electron)
  openSelectDialog(options?: any): any;
}