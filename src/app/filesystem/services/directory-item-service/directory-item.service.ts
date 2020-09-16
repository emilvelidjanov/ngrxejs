import { Observable } from 'rxjs';
import { EntityService } from 'src/app/core/ngrx/services/entity.service';

import { CreateNewInputType, DirectoryItem } from '../../store/directory-item/directory-item.state';
import { Directory } from '../../store/directory/directory.state';
import { FileItem } from '../../store/file-item/file-item.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';
import { Project } from '../../store/project/project.state';

export interface DirectoryItemService extends EntityService<DirectoryItem> {
  removeFileItemsFromMany(fileItems: FileItem[], directoryItems: DirectoryItem[]): void;
  removeDirectoryItemsFromMany(directoryItems: DirectoryItem[], parentDirectoryItems: DirectoryItem[]): void;
  selectManyByContainFileItems(fileItems: FileItem[]): Observable<DirectoryItem[]>;
  createOneFromEntities(directory: Directory, projectTree: ProjectTree): Observable<DirectoryItem>;
  createManyFromEntities(directories: Directory[], projectTree: ProjectTree): Observable<DirectoryItem[]>;
  selectByDirectory(directory: Directory): Observable<DirectoryItem[]>;
  selectOneByDirectory(directory: Directory): Observable<DirectoryItem>; // TODO: remove
  toggleOpened(directoryItem: DirectoryItem): void;
  updateLoaded(directoryItem: DirectoryItem, fileItems: FileItem[], directoryItems: DirectoryItem[]): void;
  selectByDirectories(directories: Directory[]): Observable<DirectoryItem[]>;
  showCreateNewInput(directoryItem: DirectoryItem, createNewInputType: CreateNewInputType): void;
  sortByDirectories(directoryItems: DirectoryItem[], directories: Directory[]): DirectoryItem[];
  updateDirectoryItems(directoryItems: DirectoryItem[], directoryItem: DirectoryItem): void;
  updateFileItems(fileItems: FileItem[], directoryItem: DirectoryItem): void;
  updateIsOpened(directoryItem: DirectoryItem, isOpened: boolean): void;
  selectRootOfProject(project: Project): Observable<DirectoryItem>;
  selectOrCreateManyFromEntities(directories: Directory[], projectTree: ProjectTree): Observable<DirectoryItem[]>;
  selectManyByParentDirectoryItem(directoryItem: DirectoryItem): Observable<DirectoryItem[]>;
}
