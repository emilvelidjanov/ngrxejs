import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { Directory } from '../../store/directory/directory.state';
import { FileItem } from '../../store/file-item/file-item.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

export interface DirectoryItemService {
  selectByDirectory(directory: Directory): Observable<DirectoryItem>;
  addOne(directoryItem: DirectoryItem): void;
  addMany(directoryItems: DirectoryItem[]): void;
  createOne(directory: Directory, projectTree: ProjectTree): Observable<DirectoryItem>;
  createMany(directories: Directory[], projectTree: ProjectTree): Observable<DirectoryItem[]>;
  setAll(directoryItems: DirectoryItem[]): void;
  toggleOpened(directoryItem: DirectoryItem): void;
  updateLoaded(directoryItem: DirectoryItem, fileItems: FileItem[], directoryItems: DirectoryItem[]): void;
  selectByDirectoryIds(directoryIds: Id[]): Observable<DirectoryItem[]>;
}
