import { Injectable } from '@angular/core';
import { FilesystemService } from '../filesystem.service';


@Injectable()
export class RemoteFilesystemService implements FilesystemService {
  
  debugCounter: number = 0;

  constructor() { }
  
  debug(): void {
    this.debugCounter++;
    console.log(`RemoteFilesystemService: #${this.debugCounter}`);
  }
  
  openSelectDialog(_options?: any): any {
    throw new Error("RemoteFilesystemService#openSelectDialog not implemented.");
  }
}
