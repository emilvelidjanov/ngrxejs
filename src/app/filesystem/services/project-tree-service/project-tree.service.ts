import { Observable } from 'rxjs';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';

import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';
import { Project } from '../../store/project/project.state';

export interface ProjectTreeService {
  createFromPartial(partial: EntityPartial<ProjectTree>): ProjectTree;
  select(id: Id): Observable<ProjectTree>;
  addMany(projectTrees: ProjectTree[]): void;
  updateOpenedProject(projectTree: ProjectTree, project: Project, rootDirectoryItem: DirectoryItem): void;
}
