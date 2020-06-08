import { Inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { filter, share, switchMap, tap } from 'rxjs/operators';
import openProjectOptions from 'src/config/filesystem/openProjectOptions.json';

import { Directory } from '../../store/directory/directory.state';
import { File } from '../../store/file/file.state';
import { DirectoryContent, DirectoryService } from '../directory-service/directory.service';
import { directoryServiceDep } from '../directory-service/directory.service.dependency';
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
    @Inject(projectServiceDep.getToken()) private projectService: ProjectService,
    @Inject(directoryServiceDep.getToken()) private directoryService: DirectoryService,
    @Inject(fileServiceDep.getToken()) private fileService: FileService,
  ) {}

  public openProject(): void {
    const openDialog$ = this.filesystemService.openDialog(openProjectOptions).pipe(
      filter((result: OpenDialogResult) => !result.canceled),
      share(),
    );
    const loadAndCreateDirectoryContent$ = openDialog$.pipe(
      switchMap((result: OpenDialogResult) => this.loadAndCreateDirectoryContent(result.filePaths[0])),
      share(),
    );
    const openDirectory$ = forkJoin([openDialog$, loadAndCreateDirectoryContent$]);
    const createProject$ = openDirectory$.pipe(
      switchMap(([openedDialog, directoryContent]) =>
        this.projectService.createProject(openedDialog, directoryContent),
      ),
    );
    const dispatch$ = forkJoin([loadAndCreateDirectoryContent$, createProject$]);
    dispatch$.subscribe(([directoryContent, createdProject]) => {
      this.projectService.dispatchOpenedProject(createdProject, directoryContent);
    }, console.error);
  }

  public openDirectory(directory: Directory): void {
    const isLoadedDirectory$ = this.directoryService.selectIsLoadedDirectory(directory);
    const loadAndCreateDirectoryContent$ = isLoadedDirectory$.pipe(
      filter((isLoaded: boolean) => !isLoaded),
      switchMap(() => this.loadAndCreateDirectoryContent(directory.path)),
    );
    loadAndCreateDirectoryContent$.subscribe((directoryContent: DirectoryContent) =>
      this.directoryService.dispatchLoadedDirectory(directory, directoryContent),
    );
    this.directoryService.dispatchOpenedDirectory(directory);
  }

  public openFile(file: File): void {
    const isLoadedFile$ = this.fileService.selectIsLoadedFile(file);
    const loadFileContent$ = isLoadedFile$.pipe(
      filter((isLoaded: boolean) => !isLoaded),
      switchMap(() => this.filesystemService.loadFile(file.path)),
    );
    loadFileContent$.subscribe((content: string) => console.log(content));
  }

  private loadAndCreateDirectoryContent(path: string): Observable<DirectoryContent> {
    const loadAndCreateDirectoryContent$ = this.filesystemService
      .loadDirectory(path)
      .pipe(switchMap((results: LoadDirectoryResult[]) => this.directoryService.createDirectoryContent(results)));
    return loadAndCreateDirectoryContent$;
  }
}
