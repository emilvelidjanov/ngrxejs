export interface FilesystemService {

  debugCounter: number;
  debug(): void;

  //TODO?: fix options typing (web & electron)
  openSelectDialog(options?: any): void;
}