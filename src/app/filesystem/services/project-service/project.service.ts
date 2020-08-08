import { Observable } from 'rxjs';

import { Directory } from '../../store/directory/directory.state';
import { Project } from '../../store/project/project.state';

export interface ProjectService {
  createOne(rootDirectory: Directory): Observable<Project>;
  addOne(project: Project): void;
  selectByRootDirectory(directory: Directory): Observable<Project>;
}
