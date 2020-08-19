import { Observable } from 'rxjs';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';

import { CreateNewInputType, DirectoryItem } from '../../store/directory-item/directory-item.state';
import { File } from '../../store/file/file.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

export interface FilesystemFacade {
  selectFile(id: Id): Observable<File>;
  selectProjectTree(id: Id): Observable<ProjectTree>;
  selectDirectoryItem(id: Id): Observable<DirectoryItem>;
  addProjectTreesConfig(partials: EntityPartial<ProjectTree>[]): void;
  openProject(projectTree: ProjectTree): void;
  openDirectoryItem(directoryItem: DirectoryItem): void;
  loadFile(file: File): void;
  showCreateNewInputDirectoryItem(directoryItem: DirectoryItem, createNewInputType: CreateNewInputType): void;
  createNewDirectory(directoryItem: DirectoryItem, name: string): void;
}
