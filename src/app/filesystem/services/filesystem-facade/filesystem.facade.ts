import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { File } from '../../store/file/file.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

export interface FilesystemFacade {
  selectProjectTree(id: Id): Observable<ProjectTree>;
  addProjectTreesConfig(partialProjectTrees: Partial<ProjectTree>[]): void;
  openProject(projectTree: ProjectTree): void;
  openDirectoryItem(directoryItem: DirectoryItem): void;
  loadFile(file: File): void;
}
