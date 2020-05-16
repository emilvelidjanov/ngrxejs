import { Observable } from 'rxjs';

import { File } from '../../store/file/file.state';
import { Project } from '../../store/project/project.state';
import { OpenDialogResult } from '../filesystem-service/filesystem.service';

export interface ProjectService {
  createProject(openDialogResult: OpenDialogResult, files: File[]): Observable<Project>;
  dispatchOpenedProject(project: Project): void;
}
