import { Observable } from 'rxjs';

export interface FilesystemService {
  openDialog(options?: any): Observable<OpenDialogResult>;
  loadDirectory(path: string): Observable<LoadDirectoryResult[]>;
  loadFile(path: string): Observable<string>;
  statPath(path: string): Observable<StatResult>;
}

export interface OpenDialogResult {
  canceled: boolean;
  filePaths: string[];
  filenames: string[];
}

export interface LoadDirectoryResult {
  name: string;
  path: string;
  extension: string;
  isDirectory: boolean;
}

export interface StatResult {
  name: string;
  path: string;
  extension: string;
  isDirectory: boolean;
}
