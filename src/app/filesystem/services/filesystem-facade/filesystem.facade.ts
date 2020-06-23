import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { Directory } from '../../store/directory/directory.state';
import { File } from '../../store/file/file.state';

export interface FilesystemFacade {
  openProject(): void;
  openDirectory(directory: Directory): void;
  loadFile(file: File): Observable<string>;
  openContextMenuFileTree(contextMenuId: Id, x: number, y: number): void;
  openContextMenu(contextMenuId: Id, x: number, y: number): void;
}
