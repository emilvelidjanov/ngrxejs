import { Injectable } from '@angular/core';
import { FilesystemService } from '../filesystem.service';


@Injectable()
export class RemoteFilesystemService implements FilesystemService {

  constructor() { }
  
  openSelectDialog(options?: any): any {
    throw new Error("RemoteFilesystemService#openSelectDialog not implemented.");
  }
}
