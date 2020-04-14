import { Injectable, Inject } from '@angular/core';
import { FilesystemFacade } from '../filesystem.facade';
import { FilesystemService, SelectDialogResult } from '../../filesystem-service/filesystem.service';
import { filesystemServiceDep } from '../../filesystem-service/filesystem.service.dependency';
import { OpenDialogOptions } from 'electron';
import openProjectOptions from "src/config/filesystem/openProjectOptions.json";


@Injectable()
export class DefaultFilesystemFacade implements FilesystemFacade {

  constructor(
    @Inject(filesystemServiceDep.getToken()) private filesystemService: FilesystemService
  ) { }

  openProjectDirectory(): void {
    let options: OpenDialogOptions = openProjectOptions as OpenDialogOptions;
    this.filesystemService.openSelectDialog(options)
    .subscribe((value: SelectDialogResult) => {
      this.filesystemService.setLoadedDirectory(value);
    })
  }
}
