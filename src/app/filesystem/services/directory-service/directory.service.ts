import { Observable } from 'rxjs';

import { Directory } from '../../store/directory/directory.state';
import { File } from '../../store/file/file.state';
import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';

export interface DirectoryService {
  createDirectoryContent(loadDirectoryResults: LoadDirectoryResult[]): Observable<DirectoryContent>;
  createMany(loadDirectoryResults: LoadDirectoryResult[]): Observable<Directory[]>;
  sortDefault(directory: Directory[]): Directory[];
  setAll(directories: Directory[]): void;
  updateLoaded(loadedDirectory: Directory, content: DirectoryContent): void;
  toggleOpened(directory: Directory): void;
  isLoaded(directory: Directory): Observable<boolean>;
}

export interface DirectoryContent {
  files: File[];
  directories: Directory[];
}
