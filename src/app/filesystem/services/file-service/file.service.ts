import { Observable } from 'rxjs';
import { EntityService } from 'src/app/core/ngrx/services/entity.service';

import { Directory } from '../../store/directory/directory.state';
import { File } from '../../store/file/file.state';
import { StatResult } from '../filesystem-service/filesystem.service';

export interface FileService extends EntityService<File> {
  updateContent(file: File, content: string);
  selectByPaths(paths: string[]): Observable<File[]>;
  createManyFromStatResults(statResults: StatResult[]): Observable<File[]>;
  updateLoaded(file: File, content: string): void;
  sort(files: File[]): File[];
  selectOrCreateManyFromStatResults(statResults: StatResult[]): Observable<File[]>;
  selectManyByParentDirectory(directory: Directory): Observable<File[]>;
  dispatchDeletedEvent(file: File): void;
}
