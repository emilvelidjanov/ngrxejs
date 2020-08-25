import { Observable } from 'rxjs';
import { Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';

import { Directory } from '../../store/directory/directory.state';
import { File } from '../../store/file/file.state';
import { StatResult } from '../filesystem-service/filesystem.service';

export interface DirectoryService {
  selectById(id: Id): Observable<Directory>;
  selectByIds(ids: Id[]): Observable<Directory[]>;
  selectByPaths(paths: string[]): Observable<Directory[]>;
  addOne(directory: Directory): void;
  addMany(directories: Directory[]): void;
  select(id: Id): Observable<Directory>;
  createOne(partial: IdLessPartial<Directory>): Observable<Directory>;
  createMany(loadDirectoryResults: StatResult[]): Observable<Directory[]>;
  updateLoaded(loadedDirectory: Directory, files: File[], directories: Directory[]): void;
  selectByPath(path: string): Observable<Directory>;
  sort(directories: Directory[]): Directory[];
  updateDirectories(directories: Directory[], directory: Directory): void;
  updateFiles(files: File[], directory: Directory): void;
}
