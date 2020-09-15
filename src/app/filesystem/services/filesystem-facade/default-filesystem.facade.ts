import { Inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, share, switchMap, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';

import openProjectOptions from '../../config/openProjectOptions.json';
import { CreateNewInputType, DirectoryItem } from '../../store/directory-item/directory-item.state';
import { Directory } from '../../store/directory/directory.state';
import { FileItem } from '../../store/file-item/file-item.state';
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
    return this.fileService.selectOne(id);
  }

  public selectFileItem(id: Id): Observable<FileItem> {
    return this.fileItemService.selectOne(id);
  }

  public selectProjectTree(id: Id): Observable<ProjectTree> {
    return this.projectTreeService.selectOne(id);
  }

  public selectDirectory(id: Id): Observable<Directory> {
    return this.directoryService.selectOne(id);
  }

  public selectDirectoryItem(id: Id): Observable<DirectoryItem> {
    return this.directoryItemService.selectOne(id);
  }

  public addProjectTreesConfig(partials: EntityPartial<ProjectTree>[]): void {
    const projectTrees = partials.map((partial) => this.projectTreeService.createDefault(partial));
    this.projectTreeService.addMany(projectTrees);
  }

  public openProject(projectTree: ProjectTree): void {
    const openDialog$ = this.filesystemService.openDialog(openProjectOptions).pipe(takeWhile((result) => !result.canceled));
    const selectExistingProject$ = openDialog$.pipe(
      switchMap((result) => this.projectService.selectByRootDirectoryPath(result.paths[0])),
      takeWhile((project) => !!project),
      take(1),
      share(),
    );
    // TODO: select root of projectTree
    const selectExistingRootDirectoryItem$ = selectExistingProject$.pipe(
      switchMap((project) => this.directoryItemService.selectRootOfProject(project)),
      take(1),
    );
    const createRootDirectory$ = openDialog$.pipe(
      takeUntil(selectExistingProject$),
      switchMap((result) => this.filesystemService.statPath(result.paths[0])),
      takeWhile((stat) => stat.isDirectory),
      switchMap((stat) => this.directoryService.createOneFromStatResult(stat)),
      share(),
    );
    const createRootDirectoryItem$ = createRootDirectory$.pipe(
      switchMap((directory) => this.directoryItemService.createOneFromEntities(directory, projectTree)),
      take(1),
    );
    const createProject$ = createRootDirectory$.pipe(
      switchMap((directory) => this.projectService.createOneFromEntities(directory)),
      take(1),
    );
    forkJoin([createRootDirectory$, createRootDirectoryItem$, createProject$]).subscribe(([directory, directoryItem, project]) => {
      this.directoryService.addOne(directory);
      this.directoryItemService.addOne(directoryItem);
      this.projectService.addOne(project);
      this.projectTreeService.updateOpenedProject(projectTree, project, directoryItem);
      this.openDirectoryItem(directoryItem);
    });
    forkJoin([selectExistingProject$, selectExistingRootDirectoryItem$]).subscribe(([project, directoryItem]) => {
      this.projectTreeService.updateOpenedProject(projectTree, project, directoryItem);
      // TODO: open directoryItem if not opened
    });
  }

  public openDirectoryItem(directoryItem: DirectoryItem): void {
    const selectDirectory$ = this.directoryService.selectOneByDirectoryItem(directoryItem).pipe(take(1), share());
    const results$ = selectDirectory$.pipe(
      takeWhile((directory) => !directory.isLoaded),
      switchMap((directory) => this.filesystemService.loadDirectory(directory.path)),
      map((results) => this.filesystemService.partitionLoadDirectoryResults(results)),
    );
    const selectOrCreateFilesAndDirs$ = results$.pipe(
      switchMap(([fileResults, dirResults]) =>
        forkJoin([
          this.fileService.selectOrCreateManyFromStatResults(fileResults).pipe(take(1)),
          this.directoryService.selectOrCreateManyFromStatResults(dirResults).pipe(take(1)),
        ]),
      ),
    );
    const selectProjectTree$ = this.projectTreeService.selectOne(directoryItem.projectTreeId).pipe(take(1));
    const selectOrCreateItems$ = forkJoin([selectOrCreateFilesAndDirs$, selectProjectTree$]).pipe(
      switchMap(([[files, directories], projectTree]) =>
        forkJoin([
          this.fileItemService.selectOrCreateManyFromEntities(files, projectTree).pipe(take(1)),
          this.directoryItemService.selectOrCreateManyFromEntities(directories, projectTree).pipe(take(1)),
        ]),
      ),
    );
    forkJoin([selectDirectory$, selectOrCreateFilesAndDirs$, selectOrCreateItems$]).subscribe(
      ([selectDirectory, [files, dirs], [fileItems, dirItems]]) => {
        this.fileService.addMany(files);
        this.directoryService.addMany(dirs);
        const sortedFiles = this.fileService.sort(files);
        const sortedDirs = this.directoryService.sort(dirs);
        this.directoryService.updateLoaded(selectDirectory, sortedFiles, sortedDirs);
        this.fileItemService.addMany(fileItems);
        this.directoryItemService.addMany(dirItems);
        const sortedFileItems = this.fileItemService.sortByFiles(fileItems, sortedFiles);
        const sortedDirItems = this.directoryItemService.sortByDirectories(dirItems, sortedDirs);
        this.directoryItemService.updateLoaded(directoryItem, sortedFileItems, sortedDirItems);
      },
    );
    this.directoryItemService.toggleOpened(directoryItem);
  }

  public loadFile(file: File): void {
    if (!file.isLoaded) {
      const loadFile$ = this.filesystemService.loadFile(file.path).pipe(tap((content) => this.fileService.updateLoaded(file, content)));
      loadFile$.subscribe();
    }
  }

  public showCreateNewInputDirectoryItem(directoryItem: DirectoryItem, createNewInputType: CreateNewInputType): void {
    this.directoryItemService.updateIsOpened(directoryItem, true);
    this.directoryItemService.showCreateNewInput(directoryItem, createNewInputType);
  }

  public createNewDirectory(directoryItem: DirectoryItem, name: string): void {
    const directory$ = this.directoryService.selectOneByDirectoryItem(directoryItem).pipe(take(1), share());
    const createDirectoryFilesystem$ = directory$.pipe(
      switchMap((directory) => this.filesystemService.createDirectory(directory.path, name)),
      takeWhile((result) => !!result),
    );
    const createDirectory$ = createDirectoryFilesystem$.pipe(
      switchMap((stat) => this.directoryService.createOne({ name: stat.name, path: stat.path })),
      take(1),
      share(),
    );
    const selectProjectTree$ = this.projectTreeService.selectOneByDirectoryItem(directoryItem).pipe(take(1));
    const createDirectoryItem$ = forkJoin([createDirectory$, selectProjectTree$]).pipe(
      switchMap(([directory, projectTree]) => this.directoryItemService.createOneFromEntities(directory, projectTree)),
      take(1),
    );
    const currentDirectories$ = directory$.pipe(switchMap((directory) => this.directoryService.selectManyByParentDirectory(directory).pipe(take(1))));
    const currentDirectoryItems$ = this.directoryItemService.selectManyByParentDirectoryItem(directoryItem).pipe(take(1));
    forkJoin([createDirectory$, createDirectoryItem$, directory$, currentDirectories$, currentDirectoryItems$]).subscribe(
      ([newDirectory, newDirectoryItem, directory, directories, directoryItems]) => {
        this.directoryService.addOne(newDirectory);
        this.directoryItemService.addOne(newDirectoryItem);
        const combinedSorted = this.directoryService.sort([...directories, newDirectory]);
        this.directoryService.updateDirectories(combinedSorted, directory);
        const sortedDirItems = this.directoryItemService.sortByDirectories([...directoryItems, newDirectoryItem], combinedSorted);
        this.directoryItemService.updateDirectoryItems(sortedDirItems, directoryItem);
        this.directoryItemService.showCreateNewInput(directoryItem, 'none');
      },
    );
  }

  public createNewFile(directoryItem: DirectoryItem, name: string): void {
    const directory$ = this.directoryService.selectOneByDirectoryItem(directoryItem).pipe(take(1), share());
    const createFileFilesystem$ = directory$.pipe(
      switchMap((directory) => this.filesystemService.createFile(directory.path, name)),
      takeWhile((result) => !!result),
    );
    const createFile$ = createFileFilesystem$.pipe(
      switchMap((stat) => this.fileService.createOne({ name: stat.name, path: stat.path, extension: stat.extension })),
      take(1),
      share(),
    );
    const selectProjectTree$ = this.projectTreeService.selectOneByDirectoryItem(directoryItem).pipe(take(1));
    const createFileItem$ = forkJoin([createFile$, selectProjectTree$]).pipe(
      switchMap(([file, projectTree]) => this.fileItemService.createOneFromEntities(file, projectTree)),
      take(1),
    );
    const currentFiles$ = directory$.pipe(switchMap((directory) => this.fileService.selectManyByParentDirectory(directory).pipe(take(1))));
    const currentFileItems$ = this.fileItemService.selectManyByParentDirectoryItem(directoryItem).pipe(take(1));
    forkJoin([createFile$, createFileItem$, directory$, currentFiles$, currentFileItems$]).subscribe(
      ([newFile, newFileItem, directory, files, fileItems]) => {
        this.fileService.addOne(newFile);
        this.fileItemService.addOne(newFileItem);
        const combinedSorted = this.fileService.sort([...files, newFile]);
        this.directoryService.updateFiles(combinedSorted, directory);
        const sortedFileItems = this.fileItemService.sortByFiles([...fileItems, newFileItem], combinedSorted);
        this.directoryItemService.updateFileItems(sortedFileItems, directoryItem);
        this.directoryItemService.showCreateNewInput(directoryItem, 'none');
      },
    );
  }

  public deleteFile(file: File): void {
    const deleteFile$ = this.filesystemService.deletePath(file.path).pipe(take(1));
    deleteFile$.subscribe(() => this.deleteFileEntities(file));
  }

  private deleteFileEntities(file: File): void {
    const fileItems$ = this.fileItemService.selectManyByFile(file).pipe(take(1), share());
    const directory$ = this.directoryService.selectOneByContainsFile(file).pipe(take(1));
    const directoryItems$ = fileItems$.pipe(
      switchMap((fileItems) => this.directoryItemService.selectManyByContainFileItems(fileItems)),
      take(1),
    );
    forkJoin([fileItems$, directory$, directoryItems$]).subscribe(([fileItems, directory, directoryItems]) => {
      this.directoryService.removeFile(file, directory);
      this.directoryItemService.removeFileItemsFromMany(fileItems, directoryItems);
      this.fileItemService.removeMany(fileItems);
      this.fileService.removeOne(file);
      this.fileService.dispatchDeletedEvent(file);
    });
  }

  public deleteDirectory(directory: Directory): void {
    const deleteDirectory$ = this.filesystemService.deletePath(directory.path).pipe(take(1));
    deleteDirectory$.subscribe(() => this.deleteDirectoryEntities(directory));
  }

  private deleteDirectoryEntities(directory: Directory): void {
    const directoryItems$ = this.directoryItemService.selectByDirectory(directory).pipe(take(1));
    const parentDirectory$ = this.directoryService.selectOneByContainsDirectory(directory).pipe(take(1), share());
    const parentDirectoryItems$ = parentDirectory$.pipe(
      switchMap((directory) => this.directoryItemService.selectByDirectory(directory)),
      take(1),
    );
    const childDirectories$ = this.directoryService.selectManyByParentDirectory(directory).pipe(take(1));
    const childFiles$ = this.fileService.selectManyByParentDirectory(directory).pipe(take(1));
    forkJoin([directoryItems$, parentDirectory$, parentDirectoryItems$, childDirectories$, childFiles$]).subscribe(
      ([directoryItems, parentDirectory, parentDirectoryItems, childDirectories, childFiles]) => {
        childDirectories.forEach((directory) => this.deleteDirectoryEntities(directory));
        childFiles.forEach((file) => this.deleteFileEntities(file));
        this.directoryService.removeDirectory(directory, parentDirectory);
        this.directoryItemService.removeDirectoryItemsFromMany(directoryItems, parentDirectoryItems);
        this.directoryItemService.removeMany(directoryItems);
        this.directoryService.removeOne(directory);
      },
    );
  }
}
