import { Observable } from 'rxjs';
import { EntityService } from 'src/app/core/ngrx/services/entity.service';

import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';
import { Project } from '../../store/project/project.state';

export interface ProjectTreeService extends EntityService<ProjectTree> {
  updateOpenedProject(projectTree: ProjectTree, project: Project, rootDirectoryItem: DirectoryItem): void;
  selectOneByDirectoryItem(directoryItem: DirectoryItem): Observable<ProjectTree>;
}
