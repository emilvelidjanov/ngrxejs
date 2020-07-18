import { Observable } from 'rxjs';

import { FileItem } from '../../store/file-item/file-item.state';
import { File } from '../../store/file/file.state';

export interface FileItemService {
  createMany(files: File[]): Observable<FileItem[]>;
  setAll(fileItems: FileItem[]): void;
  addMany(fileItems: FileItem[]): void;
}
