import { Observable } from 'rxjs';

import { File } from '../../store/file/file.state';
import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';

export interface FileService {
  createMany(loadDirectoryResults: LoadDirectoryResult[]): Observable<File[]>;
  sortDefault(file: File[]): File[];
  setAll(files: File[]): void;
  upsertMany(file: File[]): void;
  isLoaded(file: File): Observable<boolean>;
  updateLoaded(file: File, content: string): void;
}
