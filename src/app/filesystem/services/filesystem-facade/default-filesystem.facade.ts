import { Inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, share, switchMap, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';

import openProjectOptions from '../../config/openProjectOptions.json';
import { CreateNewInputType, DirectoryItem } from '../../store/directory-item/directory-item.state';
import { File } from '../../store/file/file.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';
import { DirectoryItemService } from '../directory-item-service/directory-item.service';
import { directoryItemServiceDep } from '../directory-item-service/directory-item.service.dependency';
import { DirectoryService } from '../directory-service/directory.service';
import { directoryServiceDep } from '../directory-service/directory.service.dependency';
import { FileItemService } from '../file-item-service/file-item.service';
import { fileItemServiceDep } from '../file-item-service/file-item.service.dependency';
import { FileService } from '../file-service/file.service';
import { fileServiceDep } from '../file-service/file.service.dependency';
import { FilesystemService } from '../filesystem-service/filesystem.service';
import { filesystemServiceDep } from '../filesystem-service/filesystem.service.dependency';
import { ProjectService } from '../project-service/project.service';
import { projectServiceDep } from '../project-service/project.service.dependency';
import { ProjectTreeService } from '../project-tree-service/project-tree.service';
import { projectTreeServiceDep } from '../project-tree-service/project-tree.service.dependency';

import { FilesystemFacade } from './filesystem.facade';

@Injectable()
export class DefaultFilesystemFacade implements FilesystemFacade {
  constructor(
    @Inject(filesystemServiceDep.getToken()) private filesystemService: FilesystemService,
    @Inject(projectServiceDep.getToken()) private projectService: ProjectService,
    @Inject(projectTreeServiceDep.getToken()) private projectTreeService: ProjectTreeService,
    @Inject(directoryServiceDep.getToken()) private directoryService: DirectoryService,
    @Inject(directoryItemServiceDep.getToken()) private directoryItemService: DirectoryItemService,
    @Inject(fileServiceDep.getToken()) private fileService: FileService,
    @Inject(fileItemServiceDep.getToken()) private fileItemService: FileItemService,
  ) {}

  public selectFile(id: Id): Observable<File> {
    return this.fileService.select(id);
  }

  public selectProjectTree(id: Id): Observable<ProjectTree> {
    return this.projectTreeService.select(id);
  }

  public selectDirectoryItem(id: Id): Observable<DirectoryItem> {
    return this.directoryItemService.select(id);
  }

  public addProjectTreesConfig(partials: EntityPartial<ProjectTree>[]): void {
    const projectTrees = partials.map((partial) => this.projectTreeService.createFromPartial(partial));
    this.projectTreeService.addMany(projectTrees);
  }

  public openProject(projectTree: ProjectTree): void {
    const openDialog$ = this.filesystemService.openDialog(openProjectOptions).pipe(
      takeWhile((result) => !result.canceled),
      share(),
    );
    const selectExistingProject$ = openDialog$.pipe(
      switchMap((result) => this.directoryService.selectByPath(result.filePaths[0])),
      takeWhile((directory) => !!directory),
      switchMap((directory) => this.projectService.selectByRootDirectory(directory)),
      takeWhile((project) => !!project),
      take(1),
      share(),
    );
    const selectExistingRootDirectoryItem$ = selectExistingProject$.pipe(
      switchMap((project) => this.directoryService.select(project.rootDirectoryId)),
      switchMap((directory) => this.directoryItemService.selectByDirectory(directory)),
      take(1),
    );
    const createRootDirectory$ = openDialog$.pipe(
      takeUntil(selectExistingProject$),
      switchMap((result) => this.filesystemService.statPath(result.filePaths[0])),
      takeWhile((stat) => stat.isDirectory),
      switchMap((stat) => this.directoryService.createOne(stat)),
      share(),
    );
    const createRootDirectoryItem$ = createRootDirectory$.pipe(
      switchMap((directory) => this.directoryItemService.createOne(directory, projectTree)),
    );
    const createProject$ = createRootDirectory$.pipe(
      switchMap((directory) => this.projectService.createOne(directory)),
    );
    const dispatchNew$ = forkJoin([createRootDirectory$, createRootDirectoryItem$, createProject$]).pipe(
      tap(([directory, directoryItem, project]) => {
        this.directoryService.addOne(directory);
        this.directoryItemService.addOne(directoryItem);
        this.projectService.addOne(project);
        this.projectTreeService.updateOpenedProject(projectTree, project, directoryItem);
        this.openDirectoryItem(directoryItem);
      }),
    );
    const dispatchExisting$ = forkJoin([selectExistingProject$, selectExistingRootDirectoryItem$]).pipe(
      tap(([project, directoryItem]) =>
        this.projectTreeService.updateOpenedProject(projectTree, project, directoryItem),
      ),
    );
    dispatchNew$.subscribe();
    dispatchExisting$.subscribe();
  }

  public openDirectoryItem(directoryItem: DirectoryItem): void {
    const selectDirectory$ = this.directoryService.select(directoryItem.directoryId).pipe(take(1), share());
    const selectProjectTree$ = this.projectTreeService.select(directoryItem.projectTreeId).pipe(take(1));
    const results$ = selectDirectory$.pipe(
      takeWhile((directory) => !directory.isLoaded),
      switchMap((directory) => this.filesystemService.loadDirectory(directory.path)),
      map((results) => this.filesystemService.partitionLoadDirectoryResults(results)),
      take(1),
      share(),
    );
    const selectFilesAndDirs$ = results$.pipe(
      switchMap(([fileResults, directoryResults]) =>
        forkJoin([
          this.fileService.selectByPaths(fileResults.map((result) => result.path)).pipe(take(1)),
          this.directoryService.selectByPaths(directoryResults.map((result) => result.path)).pipe(take(1)),
        ]),
      ),
      share(),
    );
    const selectItems$ = selectFilesAndDirs$.pipe(
      switchMap(([files, directories]) =>
        forkJoin([
          this.fileItemService.selectByFiles(files).pipe(take(1)),
          this.directoryItemService.selectByDirectories(directories).pipe(take(1)),
        ]),
      ),
    );
    const existingPaths$ = selectFilesAndDirs$.pipe(
      map(([files, directories]) => [files.map((file) => file.path), directories.map((directory) => directory.path)]),
      take(1),
    );
    const remainingResults$ = forkJoin([results$, existingPaths$]).pipe(
      map(([[fileResults, directoryResults], [filePaths, directoryPaths]]) => [
        fileResults.filter((result) => !filePaths.includes(result.path)),
        directoryResults.filter((result) => !directoryPaths.includes(result.path)),
      ]),
      take(1),
    );
    const createFilesAndDirs$ = remainingResults$.pipe(
      switchMap(([fileResults, directoryResults]) =>
        forkJoin([this.fileService.createMany(fileResults), this.directoryService.createMany(directoryResults)]),
      ),
      share(),
    );
    const createItems$ = forkJoin([createFilesAndDirs$, selectProjectTree$]).pipe(
      switchMap(([[files, directories], projectTree]) =>
        forkJoin([
          this.fileItemService.createMany(files, projectTree),
          this.directoryItemService.createMany(directories, projectTree),
        ]),
      ),
    );
    const dispatch$ = forkJoin([
      selectDirectory$,
      selectFilesAndDirs$,
      createFilesAndDirs$,
      selectItems$,
      createItems$,
    ]).pipe(
      tap(
        ([
          selectDirectory,
          [selectedFiles, selectedDirs],
          [createdFiles, createdDirs],
          [selectedFileItems, selectedDirItems],
          [createdFileItems, createdDirItems],
        ]) => {
          this.fileService.addMany(createdFiles);
          this.directoryService.addMany(createdDirs);
          this.directoryService.updateLoaded(
            selectDirectory,
            [...selectedFiles, ...createdFiles],
            [...selectedDirs, ...createdDirs],
          );
          this.fileItemService.addMany(createdFileItems);
          this.directoryItemService.addMany(createdDirItems);
          this.directoryItemService.updateLoaded(
            directoryItem,
            [...selectedFileItems, ...createdFileItems],
            [...selectedDirItems, ...createdDirItems],
          );
        },
      ),
    );
    dispatch$.subscribe();
    this.directoryItemService.toggleOpened(directoryItem);
  }

  public loadFile(file: File): void {
    if (!file.isLoaded) {
      const loadFile$ = this.filesystemService.loadFile(file.path);
      loadFile$.subscribe((content) => this.fileService.updateLoaded(file, content));
    }
  }

  public showCreateNewInputDirectoryItem(directoryItem: DirectoryItem, createNewInputType: CreateNewInputType): void {
    this.directoryItemService.showCreateNewInput(directoryItem, createNewInputType);
  }
}
