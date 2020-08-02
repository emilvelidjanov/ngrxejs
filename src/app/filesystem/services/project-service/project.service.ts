import { Observable } from 'rxjs';

import { Directory } from '../../store/directory/directory.state';
import { File } from '../../store/file/file.state';
import { Project } from '../../store/project/project.state';
import { OpenDialogResult } from '../filesystem-service/filesystem.service';

export interface ProjectService {
  createOne(openDialogResult: OpenDialogResult, files: File[], directories: Directory[]): Observable<Project>;
  set(project: Project): void;
  addMany(projects: Project[]): void;
  selectByPath(path: string): Observable<Project>;
}
