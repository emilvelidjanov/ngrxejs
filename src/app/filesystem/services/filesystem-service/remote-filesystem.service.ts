import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FilesystemService, LoadDirectoryResult, OpenDialogResult } from './filesystem.service';

@Injectable()
export class RemoteFilesystemService implements FilesystemService {
  constructor() {}

  public openDialog(options?: any): Observable<OpenDialogResult> {
    throw new Error('RemoteFilesystemService#openDialog not implemented.');
  }

  public loadDirectory(path: string): Observable<LoadDirectoryResult[]> {
    throw new Error('RemoteFilesystemService#loadDirectory not implemented.');
  }
}
