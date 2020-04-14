import { Observable } from 'rxjs';

export interface FilesystemService {

  openSelectDialog(options?: any): Observable<SelectDialogResult>;
}

export interface SelectDialogResult {
  canceled: boolean,
  filePaths: string[]
}