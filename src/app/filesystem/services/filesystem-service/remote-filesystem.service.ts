import { Injectable } from '@angular/core';
import { FilesystemService, OpenDialogResult, LoadDirectoryResult } from './filesystem.service';
import { Observable } from 'rxjs';


@Injectable()
export class RemoteFilesystemService implements FilesystemService {

  constructor() { }

  openDialog(options?: any): Observable<OpenDialogResult> {
    throw new Error('RemoteFilesystemService#openDialog not implemented.');
  }

  loadDirectory(path: string): Observable<LoadDirectoryResult[]> {
    throw new Error('RemoteFilesystemService#loadDirectory not implemented.');
  }
}
