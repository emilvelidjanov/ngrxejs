import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { FileItem } from '../../store/file-item/file-item.state';
import { File } from '../../store/file/file.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

export interface FileItemService {
  addOne(fileItem: FileItem): void;
  selectByIds(ids: Id[]): Observable<FileItem[]>;
  createOne(file: File, projectTree: ProjectTree): Observable<FileItem>;
  createMany(files: File[], projectTree: ProjectTree): Observable<FileItem[]>;
  addMany(fileItems: FileItem[]): void;
  selectByFiles(files: File[]): Observable<FileItem[]>;
  applySortByFiles(fileItems: FileItem[], files: File[]): FileItem[];
}
