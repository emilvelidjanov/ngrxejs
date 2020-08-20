import { Observable } from 'rxjs';
import { Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';

import { File } from '../../store/file/file.state';
import { StatResult } from '../filesystem-service/filesystem.service';

export interface FileService {
  addOne(file: File): void;
  selectByIds(ids: Id[]): Observable<File[]>;
  selectByPaths(paths: string[]): Observable<File[]>;
  select(id: Id): Observable<File>;
  createOne(partial: IdLessPartial<File>): Observable<File>;
  createMany(loadDirectoryResults: StatResult[]): Observable<File[]>;
  addMany(file: File[]): void;
  updateLoaded(file: File, content: string): void;
  sort(files: File[]): File[];
}
