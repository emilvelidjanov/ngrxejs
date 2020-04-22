import { Injectable, Inject } from '@angular/core';
import { FilesystemFacade } from './filesystem.facade';
import { FilesystemService, OpenDialogResult, LoadDirectoryResult } from '../filesystem-service/filesystem.service';
import { filesystemServiceDep } from '../filesystem-service/filesystem.service.dependency';
import openProjectOptions from "src/config/filesystem/openProjectOptions.json";
import { FilesystemState } from 'src/app/filesystem/store';
import { Store } from '@ngrx/store';
import { forkJoin, of, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { fileServiceDep } from '../file-service/file.service.dependency';
import { FileService } from '../file-service/file.service';
import { File } from '../../store/file/file.state';
import { addFiles } from '../../store/file/file.action';


@Injectable()
export class DefaultFilesystemFacade implements FilesystemFacade {

  constructor(
    private store: Store<FilesystemState>,
    @Inject(filesystemServiceDep.getToken()) private filesystemService: FilesystemService,
    @Inject(fileServiceDep.getToken()) private fileService: FileService,
  ) { }

  openProject(): void {
    const openDialog$ = this.filesystemService.openDialog(openProjectOptions);  //TODO: config service?
    const loadDirectory$ = openDialog$.pipe(
      switchMap((openDialogResult: OpenDialogResult) => this.loadDirectoryOfOpenedProject(openDialogResult)),
    );
    forkJoin({
      openedDialog: openDialog$,
      loadedDirectory: loadDirectory$
    }).pipe(take(1)).subscribe((result) => {
      console.log("Result", result);
      if (!result.openedDialog.canceled) {
        let files: File[] = this.fileService.createFiles(result.loadedDirectory);
        this.store.dispatch(addFiles({files}));
      }
    }, (error: any) => console.error(error));
  }

  private loadDirectoryOfOpenedProject(openDialogResult: OpenDialogResult): Observable<LoadDirectoryResult[]> {
    let result: Observable<LoadDirectoryResult[]> = of([]);
    if (!openDialogResult.canceled) {
      let path: string = openDialogResult.filePaths[0];
      result = this.filesystemService.loadDirectory(path);
    }
    return result;
  }
}
