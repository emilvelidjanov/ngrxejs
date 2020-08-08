import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { Directory } from '../../store/directory/directory.state';
import { File } from '../../store/file/file.state';
import { LoadDirectoryResult, StatResult } from '../filesystem-service/filesystem.service';

export interface DirectoryService {
  selectByPaths(paths: string[]): Observable<Directory[]>;
  addOne(directory: Directory): void;
  addMany(directories: Directory[]): void;
  select(id: Id): Observable<Directory>;
  createOne(stat: StatResult): Observable<Directory>;
  createMany(loadDirectoryResults: LoadDirectoryResult[]): Observable<Directory[]>;
  updateLoaded(loadedDirectory: Directory, files: File[], directories: Directory[]): void;
  selectByPath(path: string): Observable<Directory>;
}
