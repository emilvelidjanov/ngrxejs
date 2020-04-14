import { Injectable } from '@angular/core';
import { FilesystemService, SelectDialogResult } from '../filesystem.service';


@Injectable()
export class RemoteFilesystemService implements FilesystemService {

  constructor() { }
  
  openSelectDialog(options?: any): any {
    throw new Error("RemoteFilesystemService#openSelectDialog not implemented.");
  }

  setLoadedDirectory(selectDialogResult: SelectDialogResult): void {
    throw new Error("RemoteFilesystemService#setLoadedDirectory not implemented.");
  }
}
