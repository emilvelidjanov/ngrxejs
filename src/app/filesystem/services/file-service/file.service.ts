import { Observable } from 'rxjs';
import { EntityService } from 'src/app/core/ngrx/services/entity.service';

import { File } from '../../store/file/file.state';
import { StatResult } from '../filesystem-service/filesystem.service';

export interface FileService extends EntityService<File> {
  selectByPaths(paths: string[]): Observable<File[]>;
  createManyByStatResults(statResults: StatResult[]): Observable<File[]>;
  updateLoaded(file: File, content: string): void;
  sort(files: File[]): File[];
}
