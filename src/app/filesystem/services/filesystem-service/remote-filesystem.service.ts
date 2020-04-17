import { Injectable } from '@angular/core';
import { FilesystemService, OpenDialogResult } from './filesystem.service';
import { Observable } from 'rxjs';
import { FileItemState } from 'src/app/filesystem/store/state/file-item.state';


@Injectable()
export class RemoteFilesystemService implements FilesystemService {

  constructor() { }
  
  openDialog(options?: any): Observable<OpenDialogResult> {
    throw new Error("RemoteFilesystemService#openDialog not implemented.");
  }

  loadDirectoryFromOpenDialogResult(openDialogResult: OpenDialogResult): Observable<FileItemState[]> {
    throw new Error("RemoteFilesystemService#loadDirectoryFromOpenDialogResult not implemented.");
  }

  loadDirectory(path: string): Observable<FileItemState[]> {
    throw new Error("RemoteFilesystemService#setLoadedDirectory not implemented.");
  }
}
