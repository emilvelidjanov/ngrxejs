import { Observable } from 'rxjs';

import { FileItem } from '../../store/file-item/file-item.state';
import { File } from '../../store/file/file.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

export interface FileItemService {
  createMany(files: File[], projectTree: ProjectTree): Observable<FileItem[]>;
  addMany(fileItems: FileItem[]): void;
  selectByFiles(files: File[]): Observable<FileItem[]>;
}
