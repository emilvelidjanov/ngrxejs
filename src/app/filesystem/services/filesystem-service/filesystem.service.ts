import { Observable } from 'rxjs';
import { File } from '../../store/state/file.state';


export interface FilesystemService {

  openDialog(options?: any): Observable<OpenDialogResult>;
  loadDirectory(path: string): Observable<File[]>;
}

export interface OpenDialogResult {
  canceled: boolean,
  filePaths: string[]
}