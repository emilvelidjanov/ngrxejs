import { Observable } from 'rxjs';

export interface FilesystemService {

  openDialog(options?: any): Observable<OpenDialogResult>;
  loadDirectoryFromOpenDialogResult(openDialogResult: OpenDialogResult): Observable<string[]>;
  loadDirectory(path: string): Observable<string[]>;  //TODO: return type interface?
}

export interface OpenDialogResult {
  canceled: boolean,
  filePaths: string[]
}