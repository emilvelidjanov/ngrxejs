import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FilesystemService, LoadDirectoryResult, OpenDialogResult } from './filesystem.service';

@Injectable()
export class RemoteFilesystemService implements FilesystemService {
  constructor() {}

  public openDialog(_options?: any): Observable<OpenDialogResult> {
    throw new Error('RemoteFilesystemService#openDialog not implemented.');
  }

  public loadDirectory(_path: string): Observable<LoadDirectoryResult[]> {
    throw new Error('RemoteFilesystemService#loadDirectory not implemented.');
  }

  public loadFile(_path: string): Observable<string> {
    throw new Error('RemoteFilesystemService#loadFile not implemented.');
  }
}
