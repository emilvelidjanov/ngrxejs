import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { CreateNewInputType, DirectoryItem } from '../../store/directory-item/directory-item.state';
import { Directory } from '../../store/directory/directory.state';
import { FileItem } from '../../store/file-item/file-item.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

export interface DirectoryItemService {
  select(id: Id): Observable<DirectoryItem>;
  selectByDirectory(directory: Directory): Observable<DirectoryItem>;
  addOne(directoryItem: DirectoryItem): void;
  addMany(directoryItems: DirectoryItem[]): void;
  createOne(directory: Directory, projectTree: ProjectTree): Observable<DirectoryItem>;
  createMany(directories: Directory[], projectTree: ProjectTree): Observable<DirectoryItem[]>;
  toggleOpened(directoryItem: DirectoryItem): void;
  updateLoaded(directoryItem: DirectoryItem, fileItems: FileItem[], directoryItems: DirectoryItem[]): void;
  selectByDirectories(directories: Directory[]): Observable<DirectoryItem[]>;
  showCreateNewInput(directoryItem: DirectoryItem, createNewInputType: CreateNewInputType): void;
}
