import { Observable } from 'rxjs';

import { Project } from '../../store/project/project.state';
import { DirectoryContent } from '../directory-service/directory.service';
import { OpenDialogResult } from '../filesystem-service/filesystem.service';

export interface ProjectService {
  create(openDialogResult: OpenDialogResult, directoryContent: DirectoryContent): Observable<Project>;
  open(project: Project, content: DirectoryContent): void;
  isAnyOpened(): Observable<boolean>;
}
