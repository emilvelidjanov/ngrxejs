import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FilesystemService, OpenDialogResult, StatResult } from './filesystem.service';

@Injectable()
export class RemoteFilesystemService implements FilesystemService {
  constructor() {}

  public createFile(path: string, name: string): Observable<StatResult> {
    throw new Error('RemoteFilesystemService#createFile not implemented.');
  }

  public createDirectory(path: string, name: string): Observable<StatResult> {
    throw new Error('RemoteFilesystemService#createDirectory not implemented.');
  }

  public partitionLoadDirectoryResults(results: StatResult[]): [StatResult[], StatResult[]] {
    throw new Error('RemoteFilesystemService#partitionLoadDirectoryResults not implemented.');
  }

  public openDialog(options?: any): Observable<OpenDialogResult> {
    throw new Error('RemoteFilesystemService#openDialog not implemented.');
  }

  public loadDirectory(path: string): Observable<StatResult[]> {
    throw new Error('RemoteFilesystemService#loadDirectory not implemented.');
  }

  public loadFile(path: string): Observable<string> {
    throw new Error('RemoteFilesystemService#loadFile not implemented.');
  }

  public statPath(path: string): Observable<StatResult> {
    throw new Error('RemoteFilesystemService#statPath not implemented.');
  }
}
