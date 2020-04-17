import { Injectable, Inject } from '@angular/core';
import { FilesystemFacade } from './filesystem.facade';
import { FilesystemService, OpenDialogResult } from '../filesystem-service/filesystem.service';
import { filesystemServiceDep } from '../filesystem-service/filesystem.service.dependency';
import openProjectOptions from "src/config/filesystem/openProjectOptions.json";
import { FileItemState } from 'src/app/filesystem/store/state/file-item.state';
import { State } from 'src/app/filesystem/store/reducers';
import { Store } from '@ngrx/store';


@Injectable()
export class DefaultFilesystemFacade implements FilesystemFacade {

  constructor(
    private store: Store<State>,
    @Inject(filesystemServiceDep.getToken()) private filesystemService: FilesystemService
  ) { }

  //TODO: use rxjs maps instead
  openProject(): void {
    this.filesystemService.openDialog(openProjectOptions)
    .subscribe((openDialogResult: OpenDialogResult) => {
      this.filesystemService.loadDirectoryFromOpenDialogResult(openDialogResult)
      .subscribe((files: FileItemState[]) => {
        console.log(files);
      });
    })
  }
}
