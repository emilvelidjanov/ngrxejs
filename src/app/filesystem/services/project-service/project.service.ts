import { Observable } from 'rxjs';
import { EntityService } from 'src/app/core/ngrx/services/entity.service';

import { Directory } from '../../store/directory/directory.state';
import { Project } from '../../store/project/project.state';

export interface ProjectService extends EntityService<Project> {
  selectByRootDirectory(directory: Directory): Observable<Project>;
}
