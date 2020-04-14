import { Injectable, Inject } from '@angular/core';
import { FilesystemFacade } from '../filesystem.facade';
import { FilesystemService } from '../../filesystem-service/filesystem.service';
import { filesystemServiceDep } from '../../filesystem-service/filesystem.service.dependency';

@Injectable()
export class DefaultFilesystemFacade implements FilesystemFacade {

  constructor(
    @Inject(filesystemServiceDep.getToken()) private filesystemService: FilesystemService
  ) { }

  openProject(): void {
    this.filesystemService.openSelectDialog().subscribe((data) => {
      console.log("FilesystemFacade:", data);
    })
  }
}
