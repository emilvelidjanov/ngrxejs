import { Observable } from 'rxjs';
import { FileItemState } from '../../store/state/file-item.state';

export interface FilesystemService {

  openDialog(options?: any): Observable<OpenDialogResult>;
  loadDirectoryFromOpenDialogResult(openDialogResult: OpenDialogResult): Observable<FileItemState[]>;
  loadDirectory(path: string): Observable<FileItemState[]>;
}

export interface OpenDialogResult {
  canceled: boolean,
  filePaths: string[]
}