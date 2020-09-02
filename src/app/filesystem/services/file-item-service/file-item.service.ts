import { Observable } from 'rxjs';
import { EntityService } from 'src/app/core/ngrx/services/entity.service';

import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { FileItem } from '../../store/file-item/file-item.state';
import { File } from '../../store/file/file.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

export interface FileItemService extends EntityService<FileItem> {
  createOneFromEntities(file: File, projectTree: ProjectTree): Observable<FileItem>;
  selectByFiles(files: File[]): Observable<FileItem[]>;
  sortByFiles(fileItems: FileItem[], files: File[]): FileItem[];
  createManyFromEntities(files: File[], projectTree: ProjectTree): Observable<FileItem[]>;
  selectOrCreateManyFromEntities(files: File[], projectTree: ProjectTree): Observable<FileItem[]>;
  selectManyByParentDirectoryItem(directoryItem: DirectoryItem): Observable<FileItem[]>;
}
