import { Observable } from 'rxjs';

import { Directory } from '../../store/directory/directory.state';
import { File } from '../../store/file/file.state';
import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';

export interface DirectoryService {
  createDirectoryContent(loadDirectoryResults: LoadDirectoryResult[]): Observable<DirectoryContent>;
  createDirectories(loadDirectoryResults: LoadDirectoryResult[]): Observable<Directory[]>;
  sortDirectoriesDefault(directory: Directory[]): Directory[];
  dispatchSetAll(directories: Directory[]): void;
  dispatchAddMany(directories: Directory[]): void;
  dispatchLoadedDirectory(loadedDirectory: Directory, content: DirectoryContent): void;
  dispatchOpenedDirectory(directory: Directory): void;
  selectIsLoadedDirectory(directory: Directory): Observable<boolean>;
}

export interface DirectoryContent {
  files: File[];
  directories: Directory[];
}
