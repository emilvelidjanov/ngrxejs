import { Observable } from 'rxjs';
import { EntityService } from 'src/app/core/ngrx/services/entity.service';

import { FileItem } from '../../store/file-item/file-item.state';
import { File } from '../../store/file/file.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

export interface FileItemService extends EntityService<FileItem> {
  selectByFiles(files: File[]): Observable<FileItem[]>;
  applySortByFiles(fileItems: FileItem[], files: File[]): FileItem[];
  createManyByEntities(files: File[], projectTree: ProjectTree): Observable<FileItem[]>;
}
