import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { FileItem } from '../../store/file-item/file-item.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';
import { Project } from '../../store/project/project.state';

export interface ProjectTreeService {
  selectById(id: Id): Observable<ProjectTree>;
  addMany(projectTrees: ProjectTree[]);
  updateOpenedProject(
    projectTree: ProjectTree,
    project: Project,
    directoryItems: DirectoryItem[],
    fileItems: FileItem[],
  );
  populateOptionals(partialProjectTrees: Partial<ProjectTree>[]): ProjectTree[];
}
