import { Observable } from 'rxjs';
import { EntityService } from 'src/app/core/ngrx/services/entity.service';

import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { Directory } from '../../store/directory/directory.state';
import { File } from '../../store/file/file.state';
import { Project } from '../../store/project/project.state';
import { StatResult } from '../filesystem-service/filesystem.service';

export interface DirectoryService extends EntityService<Directory> {
  selectByPaths(paths: string[]): Observable<Directory[]>;
  createOneFromStatResult(statResult: StatResult): Observable<Directory>;
  createManyFromStatResults(statResult: StatResult[]): Observable<Directory[]>;
  updateLoaded(loadedDirectory: Directory, files: File[], directories: Directory[]): void;
  selectByPath(path: string): Observable<Directory>;
  sort(directories: Directory[]): Directory[];
  updateDirectories(directories: Directory[], directory: Directory): void;
  updateFiles(files: File[], directory: Directory): void;
  selectRootOfProject(project: Project): Observable<Directory>;
  selectOneByDirectoryItem(directoryItem: DirectoryItem): Observable<Directory>;
  selectOrCreateManyFromStatResults(statResults: StatResult[]): Observable<Directory[]>;
}
