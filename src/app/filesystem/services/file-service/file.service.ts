import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { File } from '../../store/file/file.state';
import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';

export interface FileService {
  select(id: Id): Observable<File>;
  createMany(loadDirectoryResults: LoadDirectoryResult[]): Observable<File[]>;
  setAll(files: File[]): void;
  addMany(file: File[]): void;
  updateLoaded(file: File, content: string): void;
}
