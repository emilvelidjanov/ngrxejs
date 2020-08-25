import { Observable } from 'rxjs';

export interface FilesystemService {
  openDialog(options?: any): Observable<OpenDialogResult>;
  loadDirectory(path: string): Observable<StatResult[]>;
  loadFile(path: string): Observable<string>;
  statPath(path: string): Observable<StatResult>;
  partitionLoadDirectoryResults(results: StatResult[]): [StatResult[], StatResult[]];
  createDirectory(path: string, name: string): Observable<StatResult>;
  createFile(path: string, name: string): Observable<StatResult>;
}

export interface OpenDialogResult {
  canceled: boolean;
  filePaths: string[];
  fileNames: string[];
}

export interface PathAndName {
  path: string;
  name: string;
}

export interface StatResult extends PathAndName {
  extension: string;
  isDirectory: boolean;
}
