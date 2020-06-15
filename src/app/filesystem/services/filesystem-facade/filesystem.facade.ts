import { Observable } from 'rxjs';

import { Directory } from '../../store/directory/directory.state';
import { File } from '../../store/file/file.state';

export interface FilesystemFacade {
  openProject(): void;
  openDirectory(directory: Directory): void;
  loadFile(file: File): Observable<string>;
}
