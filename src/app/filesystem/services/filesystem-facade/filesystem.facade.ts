import { Observable } from 'rxjs';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';

import { CreateNewInputType, DirectoryItem } from '../../store/directory-item/directory-item.state';
import { Directory } from '../../store/directory/directory.state';
import { FileItem } from '../../store/file-item/file-item.state';
import { File } from '../../store/file/file.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

export interface FilesystemFacade {
  selectFile(id: Id): Observable<File>;
  selectFileItem(id: Id): Observable<FileItem>;
  selectProjectTree(id: Id): Observable<ProjectTree>;
  selectDirectory(id: Id): Observable<Directory>;
  selectDirectoryItem(id: Id): Observable<DirectoryItem>;
  addProjectTreesConfig(partials: EntityPartial<ProjectTree>[]): void;
  openProject(projectTree: ProjectTree): void;
  openDirectoryItem(directoryItem: DirectoryItem): void;
  loadFile(file: File): void;
  showCreateNewInputDirectoryItem(directoryItem: DirectoryItem, createNewInputType: CreateNewInputType): void;
  createNewDirectory(directoryItem: DirectoryItem, name: string): void;
  createNewFile(directoryItem: DirectoryItem, name: string): void;
  deleteFile(file: File): void;
  deleteDirectory(directory: Directory): void;
}
