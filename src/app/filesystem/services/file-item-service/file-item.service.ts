import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { FileItem } from '../../store/file-item/file-item.state';
import { File } from '../../store/file/file.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

export interface FileItemService {
  createMany(files: File[], projectTree: ProjectTree): Observable<FileItem[]>;
  setAll(fileItems: FileItem[]): void;
  addMany(fileItems: FileItem[]): void;
  selectByFileIds(fileIds: Id[]): Observable<FileItem[]>;
}
