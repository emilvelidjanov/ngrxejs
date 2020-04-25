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
import { fileActions } from '../../store/file/file.action';
import { projectServiceDep } from '../project-service/project.service.dependency';
import { ProjectService } from '../project-service/project.service';
import { Project } from '../../store/project/project.state';
import { projectActions } from '../../store/project/project.action';


@Injectable()
export class DefaultFilesystemFacade implements FilesystemFacade {

  constructor(
    private store: Store<FilesystemState>,
    @Inject(filesystemServiceDep.getToken()) private filesystemService: FilesystemService,
    @Inject(fileServiceDep.getToken()) private fileService: FileService,
    @Inject(projectServiceDep.getToken()) private projectService: ProjectService,
  ) { }

  openProject(): void {
    const openDialog$ = this.filesystemService.openDialog(openProjectOptions);
    const loadDirectory$ = openDialog$.pipe(
      switchMap((result: OpenDialogResult) => this.loadFirstDirectory(result)),
    );
    const openProject$ = forkJoin({
      openedDialog: openDialog$, 
      loadedDirectory: loadDirectory$
    });
    openProject$.pipe(take(1)).subscribe(
      (result: OpenProjectResult) => this.createAndDispatchOpenedProject(result), 
      console.error, 
      console.log
    );
  }

  private loadFirstDirectory(openDialogResult: OpenDialogResult): Observable<LoadDirectoryResult[]> {
    let result: Observable<LoadDirectoryResult[]> = of([]);
    if (!openDialogResult.canceled) {
      let path: string = openDialogResult.filePaths[0];
      result = this.filesystemService.loadDirectory(path);
    }
    return result;
  }

  private createAndDispatchOpenedProject(openProjectResult: OpenProjectResult): void {
    if (!openProjectResult.openedDialog.canceled) {
      let files: File[] = this.fileService.createFiles(openProjectResult.loadedDirectory);
      this.store.dispatch(fileActions.setAll({entities: files}));
      let project: Project = this.projectService.createProject(openProjectResult.openedDialog, files);
      this.store.dispatch(projectActions.setAll({entities: [project]}));
      this.store.dispatch(projectActions.setOpenProjectId({id: project.id}));
    }
  }
}

export interface OpenProjectResult {
  openedDialog: OpenDialogResult,
  loadedDirectory: LoadDirectoryResult[],
}