import { Inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { filter, share, switchMap } from 'rxjs/operators';
import openProjectOptions from 'src/config/filesystem/openProjectOptions.json';

import { File } from '../../store/file/file.state';
import { FileService } from '../file-service/file.service';
import { fileServiceDep } from '../file-service/file.service.dependency';
import { FilesystemService, LoadDirectoryResult, OpenDialogResult } from '../filesystem-service/filesystem.service';
import { filesystemServiceDep } from '../filesystem-service/filesystem.service.dependency';
import { ProjectService } from '../project-service/project.service';
import { projectServiceDep } from '../project-service/project.service.dependency';

import { FilesystemFacade } from './filesystem.facade';

@Injectable()
export class DefaultFilesystemFacade implements FilesystemFacade {
  constructor(
    @Inject(filesystemServiceDep.getToken()) private filesystemService: FilesystemService,
    @Inject(fileServiceDep.getToken()) private fileService: FileService,
    @Inject(projectServiceDep.getToken()) private projectService: ProjectService,
  ) {}

  public openProject(): void {
    const openDialog$ = this.filesystemService.openDialog(openProjectOptions).pipe(
      filter((result: OpenDialogResult) => !result.canceled),
      share(),
    );
    const loadAndCreateFiles$ = openDialog$.pipe(
      switchMap((result: OpenDialogResult) => this.loadDirectoryAndCreateFiles(result.filePaths[0])),
      share(),
    );
    const openDirectory$ = forkJoin([openDialog$, loadAndCreateFiles$]);
    const createProject$ = openDirectory$.pipe(
      switchMap(([openedDialog, createdFiles]) => this.projectService.createProject(openedDialog, createdFiles)),
    );
    const dispatch$ = forkJoin([loadAndCreateFiles$, createProject$]);
    dispatch$.subscribe(([createdFiles, createdProject]) => {
      this.fileService.dispatchSetAll(createdFiles);
      this.projectService.dispatchOpenedProject(createdProject);
    }, console.error);
  }

  public openDirectory(file: File): void {
    if (file.isDirectory) {
      const isLoadedDirectory$ = this.fileService.selectIsLoadedDirectory(file);
      const loadAndCreateFiles$ = isLoadedDirectory$.pipe(
        filter((isLoaded: boolean) => !isLoaded),
        switchMap(() => this.loadDirectoryAndCreateFiles(file.path)),
      );
      loadAndCreateFiles$.subscribe((files: File[]) => {
        this.fileService.dispatchLoadedDirectory(file, files);
      });
      this.fileService.dispatchOpenedDirectory(file);
    }
  }

  private loadDirectoryAndCreateFiles(path: string): Observable<File[]> {
    const loadAndCreateFiles$ = this.filesystemService
      .loadDirectory(path)
      .pipe(switchMap((results: LoadDirectoryResult[]) => this.fileService.createFiles(results)));
    return loadAndCreateFiles$;
  }
}
