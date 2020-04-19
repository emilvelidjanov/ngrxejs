import { Injectable } from '@angular/core';
import { FilesystemService, OpenDialogResult } from './filesystem.service';
import { Observable } from 'rxjs';
import { File } from '../../store/state/file.state';


@Injectable()
export class RemoteFilesystemService implements FilesystemService {

  constructor() { }
  
  openDialog(options?: any): Observable<OpenDialogResult> {
    throw new Error("RemoteFilesystemService#openDialog not implemented.");
  }
  
  loadDirectory(path: string): Observable<File[]> {
    throw new Error("RemoteFilesystemService#loadDirectory not implemented.");
  }
}