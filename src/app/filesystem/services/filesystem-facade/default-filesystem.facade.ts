import { Inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { share, switchMap, take, takeWhile } from 'rxjs/operators';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';

import openProjectOptions from '../../config/openProjectOptions.json';
import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { Directory } from '../../store/directory/directory.state';
import { FileItem } from '../../store/file-item/file-item.state';
import { File } from '../../store/file/file.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';
import { DirectoryItemService } from '../directory-item-service/directory.service';
import { directoryItemServiceDep } from '../directory-item-service/directory.service.dependency';
import { DirectoryService } from '../directory-service/directory.service';
import { directoryServiceDep } from '../directory-service/directory.service.dependency';
import { FileItemService } from '../file-item-service/file-item.service';
import { fileItemServiceDep } from '../file-item-service/file-item.service.dependency';
import { FileService } from '../file-service/file.service';
import { fileServiceDep } from '../file-service/file.service.dependency';
import { FilesystemService, LoadDirectoryResult } from '../filesystem-service/filesystem.service';
import { filesystemServiceDep } from '../filesystem-service/filesystem.service.dependency';
import { ProjectService } from '../project-service/project.service';
import { projectServiceDep } from '../project-service/project.service.dependency';
import { ProjectTreeService } from '../project-tree-service/project.service';
import { projectTreeServiceDep } from '../project-tree-service/project.service.dependency';

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

  public selectProjectTree(id: Id): Observable<ProjectTree> {
    return this.projectTreeService.selectById(id);
  }

  public addProjectTreesConfig(partials: EntityPartial<ProjectTree>[]): void {
    const projectTrees = partials.map(this.projectTreeService.createFromPartial);
    this.projectTreeService.addMany(projectTrees);
  }

  public openProject(projectTree: ProjectTree): void {
    const openDialog$ = this.filesystemService.openDialog(openProjectOptions).pipe(
      takeWhile((result) => !result.canceled),
      share(),
    );
    const loadDirectory$ = openDialog$.pipe(
      switchMap((result) => this.filesystemService.loadDirectory(result.filePaths[0])),
    );
    const filesAndDirs$ = loadDirectory$.pipe(
      switchMap((results) => this.createFilesAndDirectories(results)),
      share(),
    );
    const project$ = forkJoin([openDialog$, filesAndDirs$]).pipe(
      switchMap(([openDialogResult, [files, directories]]) =>
        this.projectService.createOne(openDialogResult, files, directories),
      ),
    );
    const items$ = filesAndDirs$.pipe(switchMap(([files, directories]) => this.createItems(files, directories)));
    forkJoin([filesAndDirs$, items$, project$]).subscribe(
      ([[files, directories], [fileItems, directoryItems], project]) => {
        this.fileService.setAll(files);
        this.directoryService.setAll(directories);
        this.projectService.set(project);
        this.fileItemService.setAll(fileItems);
        this.directoryItemService.setAll(directoryItems);
        this.projectTreeService.updateOpenedProject(projectTree, project, directoryItems, fileItems);
      },
    );
  }

  public openDirectoryItem(directoryItem: DirectoryItem): void {
    const selectDirectory$ = this.directoryService.select(directoryItem.directoryId).pipe(take(1), share());
    const loadDirectory$ = selectDirectory$.pipe(
      takeWhile((directory) => !directory.isLoaded),
      switchMap((directory) => this.filesystemService.loadDirectory(directory.path)),
    );
    const filesAndDirs$ = loadDirectory$.pipe(
      switchMap((results) => this.createFilesAndDirectories(results)),
      share(),
    );
    const items$ = filesAndDirs$.pipe(switchMap(([files, directories]) => this.createItems(files, directories)));
    forkJoin([selectDirectory$, filesAndDirs$, items$]).subscribe(
      ([selectDirectory, [files, directories], [fileItems, directoryItems]]) => {
        this.fileService.addMany(files);
        this.directoryService.addMany(directories);
        this.directoryService.updateLoaded(selectDirectory, files, directories);
        this.fileItemService.addMany(fileItems);
        this.directoryItemService.addMany(directoryItems);
        this.directoryItemService.updateLoaded(directoryItem, fileItems, directoryItems);
      },
    );
    this.directoryItemService.toggleOpened(directoryItem);
  }

  public loadFile(file: File): void {
    const loadFile$ = this.filesystemService.loadFile(file.path).pipe(take(1));
    loadFile$.subscribe((content) => this.fileService.updateLoaded(file, content));
  }

  private createFilesAndDirectories(results: LoadDirectoryResult[]): Observable<[File[], Directory[]]> {
    const filesAndDirs$ = forkJoin([
      this.fileService.createMany(results),
      this.directoryService.createMany(results),
    ]).pipe(take(1));
    return filesAndDirs$;
  }

  private createItems(files: File[], directories: Directory[]): Observable<[FileItem[], DirectoryItem[]]> {
    const items$ = forkJoin([
      this.fileItemService.createMany(files),
      this.directoryItemService.createMany(directories),
    ]).pipe(take(1));
    return items$;
  }
}
