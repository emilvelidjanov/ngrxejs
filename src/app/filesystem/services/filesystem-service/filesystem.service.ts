import { Observable } from 'rxjs';

export interface FilesystemService {

  openSelectDialog(options?: any): Observable<SelectDialogResult>;
  setLoadedDirectory(SelectDialogResult: SelectDialogResult): void;
}

export interface SelectDialogResult {
  canceled: boolean,
  filePaths: string[]
}