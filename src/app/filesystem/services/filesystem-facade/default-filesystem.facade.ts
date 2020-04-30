import { Injectable, Inject } from '@angular/core';
import { FilesystemFacade } from './filesystem.facade';
import { FilesystemService, OpenDialogResult, LoadDirectoryResult } from '../filesystem-service/filesystem.service';
import { filesystemServiceDep } from '../filesystem-service/filesystem.service.dependency';
import openProjectOptions from "src/config/filesystem/openProjectOptions.json";
import { FilesystemState } from 'src/app/filesystem/store';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { switchMap, take, filter } from 'rxjs/operators';
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
    const openDialog$ = this.filesystemService.openDialog(openProjectOptions).pipe(
      filter((result: OpenDialogResult) => !result.canceled)
    );
    const createFiles$ = openDialog$.pipe(
      switchMap((result: OpenDialogResult) => this.filesystemService.loadDirectory(result.filePaths[0])),
      switchMap((results: LoadDirectoryResult[]) => this.fileService.createFiles$(results))
    );
    const openDirectory$ = forkJoin([openDialog$, createFiles$]);
    const createProject$ = openDirectory$.pipe(
      switchMap(([openedDialog, createdFiles]) => this.projectService.createProject$(openedDialog, createdFiles)),
    )
    const dispatch$ = forkJoin([createFiles$, createProject$]);
    dispatch$.pipe(take(1)).subscribe(([createdFiles, createdProject]) => {
      let files: File[] = createdFiles;
      let project: Project = createdProject;
      this.store.dispatch(fileActions.setAll({entities: files}));
      this.store.dispatch(projectActions.setAll({entities: [project]}));
      this.store.dispatch(projectActions.setOpenProjectId({id: project.id}));
    }, 
    console.error);
  }

  loadDirectory(file: File): void {
    if (!file.isDirectory) {
      throw new Error(`Cannot load '${file.path}' as it is not a directory`)
    };
    const loadDirectory$ = this.filesystemService.loadDirectory(file.path);
    loadDirectory$.pipe(take(1)).subscribe(
      (results: LoadDirectoryResult[]) => this.createAndDispatchLoadedDirectory(file, results),
      (error: any) => console.error(error),
    );
  }

  //TODO: make step as observable
  private createAndDispatchLoadedDirectory(file: File, loadDirectoryResults: LoadDirectoryResult[]): void {
    let newFiles: File[] = this.fileService.createFiles(loadDirectoryResults);
    this.store.dispatch(fileActions.addMany({entities: newFiles}));
    this.store.dispatch(fileActions.updateOne({
      update: {
        id: file.id as number,  //TODO: fix?
        changes: {
          fileIds: newFiles.map((file: File) => file.id)
        }
      }
    }));
  }
}