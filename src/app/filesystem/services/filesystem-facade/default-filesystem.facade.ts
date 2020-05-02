import { Injectable, Inject } from '@angular/core';
import { FilesystemFacade } from './filesystem.facade';
import { FilesystemService, OpenDialogResult, LoadDirectoryResult } from '../filesystem-service/filesystem.service';
import { filesystemServiceDep } from '../filesystem-service/filesystem.service.dependency';
import openProjectOptions from "src/config/filesystem/openProjectOptions.json";
import { FilesystemState } from 'src/app/filesystem/store';
import { Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, filter, share } from 'rxjs/operators';
import { fileServiceDep } from '../file-service/file.service.dependency';
import { FileService } from '../file-service/file.service';
import { File } from '../../store/file/file.state';
import { projectServiceDep } from '../project-service/project.service.dependency';
import { ProjectService } from '../project-service/project.service';


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
      filter((result: OpenDialogResult) => !result.canceled), 
      share()
    );
    const loadAndCreateFiles$ = openDialog$.pipe(
      switchMap((result: OpenDialogResult) => this.loadDirectoryAndCreateFiles(result.filePaths[0])),
      share()
    )
    const openDirectory$ = forkJoin([openDialog$, loadAndCreateFiles$]);
    const createProject$ = openDirectory$.pipe(
      switchMap(([openedDialog, createdFiles]) => this.projectService.createProject(openedDialog, createdFiles)),
    );
    const dispatch$ = forkJoin([loadAndCreateFiles$, createProject$]);
    dispatch$.subscribe(([createdFiles, createdProject]) => {
      this.fileService.dispatchSetAll(createdFiles);
      this.projectService.dispatchOpenedProject(createdProject);
    }, 
    console.error);
  }

  loadDirectory(file: File): void {
    if (file.isDirectory && !file.isDirectoryLoaded) {
      const loadAndCreateFiles$ = this.loadDirectoryAndCreateFiles(file.path);
      loadAndCreateFiles$.subscribe((files: File[]) => {
        this.fileService.dispatchLoadedDirectory(file, files);
      });
    };
  }

  private loadDirectoryAndCreateFiles(path: string): Observable<File[]> {
    const loadAndCreateFiles$ = this.filesystemService.loadDirectory(path).pipe(
      switchMap((results: LoadDirectoryResult[]) => this.fileService.createFiles(results))
    );
    return loadAndCreateFiles$;
  }
}