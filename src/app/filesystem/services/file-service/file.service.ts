import { Observable } from 'rxjs';

import { File } from '../../store/file/file.state';
import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';

export interface FileService {
  createFiles(loadDirectoryResults: LoadDirectoryResult[]): Observable<File[]>;
  sortFilesDefault(file: File[]): File[];
  dispatchSetAll(files: File[]): void;
  dispatchLoadedDirectory(directory: File, files: File[]): void;
  dispatchOpenedDirectory(directory: File): void;
  selectIsLoadedDirectory(directory: File): Observable<boolean>;
}
