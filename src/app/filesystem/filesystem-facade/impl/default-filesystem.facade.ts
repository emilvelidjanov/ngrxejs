import { Injectable } from '@angular/core';
import { FilesystemFacade } from '../filesystem.facade';

@Injectable()
export class DefaultFilesystemFacade implements FilesystemFacade {

  constructor() { }

  openProject(): void {
    throw new Error("DefaultFilesystemFacade#openProject not implemented.");
  }
}
