import { Observable } from 'rxjs';

import { File } from '../../store/file/file.state';
import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';

export interface FileService {
  createMany(loadDirectoryResults: LoadDirectoryResult[]): Observable<File[]>;
  setAll(files: File[]): void;
  addMany(file: File[]): void;
  updateLoaded(file: File, content: string): void;
}
