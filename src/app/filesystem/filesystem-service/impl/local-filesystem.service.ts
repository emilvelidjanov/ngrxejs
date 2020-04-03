import { Injectable } from '@angular/core';
import { FilesystemService } from '../filesystem.service';

@Injectable()
export class LocalFilesystemService implements FilesystemService {

  private counter: number = 0;

  constructor() { }

  doSomething(): void {
    this.counter++;
    console.log("LocalFilesystemService! #" + this.counter);
  }
}
