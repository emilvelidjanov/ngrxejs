import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { Directory } from '../../store/directory/directory.state';
import { File } from '../../store/file/file.state';
import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';

export interface DirectoryService {
  addMany(directories: Directory[]): void;
  select(id: Id): Observable<Directory>;
  createMany(loadDirectoryResults: LoadDirectoryResult[]): Observable<Directory[]>;
  setAll(directories: Directory[]): void;
  updateLoaded(loadedDirectory: Directory, files: File[], directories: Directory[]): void;
}
