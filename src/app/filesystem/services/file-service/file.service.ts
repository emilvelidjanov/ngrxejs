import { Observable } from 'rxjs';

import { File } from '../../store/file/file.state';
import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';

export interface FileService {
  createFiles(loadDirectoryResults: LoadDirectoryResult[]): Observable<File[]>;
  sortFilesDefault(file: File[]): File[];
  dispatchSetAll(files: File[]): void;
  dispatchAddMany(file: File[]): void;
  selectIsLoadedFile(file: File): Observable<boolean>;
  dispatchLoadedFile(file: File, content: string): void;
  dispatchOpenedFile(file: File): void;
}
