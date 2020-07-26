import { Observable } from 'rxjs';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';

import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { FileItem } from '../../store/file-item/file-item.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';
import { Project } from '../../store/project/project.state';

export interface ProjectTreeService {
  createFromPartial(partial: EntityPartial<ProjectTree>): ProjectTree;
  selectById(id: Id): Observable<ProjectTree>;
  addMany(projectTrees: ProjectTree[]): void;
  updateOpenedProject(
    projectTree: ProjectTree,
    project: Project,
    directoryItems: DirectoryItem[],
    fileItems: FileItem[],
  ): void;
}
