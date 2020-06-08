import { Observable } from 'rxjs';

import { Project } from '../../store/project/project.state';
import { DirectoryContent } from '../directory-service/directory.service';
import { OpenDialogResult } from '../filesystem-service/filesystem.service';

export interface ProjectService {
  createProject(openDialogResult: OpenDialogResult, directoryContent: DirectoryContent): Observable<Project>;
  dispatchOpenedProject(project: Project, content: DirectoryContent): void;
}
