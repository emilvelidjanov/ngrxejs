import { Inject, Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { share, switchMap, take, takeWhile, tap } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { MenuFacade } from 'src/app/menu/services/menu-facade/menu.facade';
import { menuFacadeDep } from 'src/app/menu/services/menu-facade/menu.facade.dependency';
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
    @Inject(menuFacadeDep.getToken()) private menuFacade: MenuFacade,
  ) {}

  public openProject(): void {
    const openDialog$ = this.filesystemService.openDialog(openProjectOptions).pipe(
      takeWhile((result: OpenDialogResult) => !result.canceled),
      share(),
    );
    const loadDirectoryContent$ = openDialog$.pipe(
      switchMap((result: OpenDialogResult) => this.loadDirectoryContent(result.filePaths[0])),
      share(),
    );
    const openDirectory$ = zip(openDialog$, loadDirectoryContent$);
    const createProject$ = openDirectory$.pipe(
      switchMap(([openedDialog, directoryContent]) => this.projectService.create(openedDialog, directoryContent)),
    );
    const dispatch$ = zip(loadDirectoryContent$, createProject$);
    dispatch$.subscribe(([directoryContent, createdProject]) =>
      this.projectService.open(createdProject, directoryContent),
    );
  }

  public openDirectory(directory: Directory): void {
    const isLoadedDirectory$ = this.directoryService.isLoaded(directory);
    const loadAndCreateDirectoryContent$ = isLoadedDirectory$.pipe(
      takeWhile((isLoaded: boolean) => !isLoaded),
      switchMap(() => this.loadDirectoryContent(directory.path)),
    );
    loadAndCreateDirectoryContent$.subscribe((directoryContent: DirectoryContent) => {
      this.directoryService.updateLoaded(directory, directoryContent);
    });
    this.directoryService.toggleOpened(directory);
  }

  public loadFile(file: File): Observable<string> {
    const isLoadedFile$ = this.fileService.isLoaded(file);
    const loadFile$ = isLoadedFile$.pipe(
      takeWhile((isLoaded: boolean) => !isLoaded),
      switchMap(() => this.filesystemService.loadFile(file.path)),
      tap((content: string) => this.fileService.updateLoaded(file, content)),
    );
    return loadFile$;
  }

  public openContextMenuFileTree(contextMenuId: Id, x: number, y: number) {
    const isAnyOpened$ = this.projectService.isAnyOpened();
    isAnyOpened$
      .pipe(
        takeWhile((isAnyOpened: boolean) => isAnyOpened),
        tap(() => this.openContextMenu(contextMenuId, x, y)),
        take(1),
      )
      .subscribe();
  }

  public openContextMenu(contextMenuId: Id, x: number, y: number) {
    this.menuFacade.openContextMenu(contextMenuId, x, y);
  }

  private loadDirectoryContent(path: string): Observable<DirectoryContent> {
    const loadDirectoryContent$ = this.filesystemService
      .loadDirectory(path)
      .pipe(switchMap((results: LoadDirectoryResult[]) => this.directoryService.createDirectoryContent(results)));
    return loadDirectoryContent$;
  }
}
