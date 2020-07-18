import { Observable } from 'rxjs';

import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { Directory } from '../../store/directory/directory.state';
import { FileItem } from '../../store/file-item/file-item.state';

export interface DirectoryItemService {
  addMany(directoryItems: DirectoryItem[]);
  createMany(directories: Directory[]): Observable<DirectoryItem[]>;
  setAll(directoryItems: DirectoryItem[]): void;
  toggleOpened(directoryItem: DirectoryItem): void;
  updateLoaded(directoryItem: DirectoryItem, fileItems: FileItem[], directoryItems: DirectoryItem[]);
}
