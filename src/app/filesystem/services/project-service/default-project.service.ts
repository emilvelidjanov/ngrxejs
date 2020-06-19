import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { Directory } from '../../store/directory/directory.state';
import { File } from '../../store/file/file.state';
import { projectActions } from '../../store/project/project.actions';
import { projectSelectors } from '../../store/project/project.selectors';
import { Project, Projects } from '../../store/project/project.state';
import { DirectoryContent, DirectoryService } from '../directory-service/directory.service';
import { directoryServiceDep } from '../directory-service/directory.service.dependency';
import { FileService } from '../file-service/file.service';
import { fileServiceDep } from '../file-service/file.service.dependency';
import { OpenDialogResult } from '../filesystem-service/filesystem.service';

import { ProjectService } from './project.service';

@Injectable()
export class DefaultProjectService implements ProjectService {
  private projectIds$: Observable<Id[]>;

  constructor(
    private store: Store<Projects>,
    @Inject(fileServiceDep.getToken()) private fileService: FileService,
    @Inject(directoryServiceDep.getToken()) private directoryService: DirectoryService,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
  ) {
    this.projectIds$ = this.store.pipe(select(projectSelectors.selectIds));
  }

  public create(openDialogResult: OpenDialogResult, directoryContent: DirectoryContent): Observable<Project> {
    const project$ = this.projectIds$.pipe(
      map((ids: Id[]) => this.idGeneratorService.nextId(ids)),
      map((nextId: Id) => this.mapToProject(nextId, openDialogResult, directoryContent)),
      take(1),
    );
    return project$;
  }

  public open(project: Project, content: DirectoryContent): void {
    this.fileService.setAll(content.files);
    this.directoryService.setAll(content.directories);
    this.store.dispatch(projectActions.setAll({ entities: [project] }));
    this.store.dispatch(projectActions.setOpenedIds({ ids: [project.id] }));
  }

  private mapToProject(id: Id, openDialogResult: OpenDialogResult, content: DirectoryContent): Project {
    return {
      id,
      directory: openDialogResult.filePaths[0],
      name: openDialogResult.filenames[0],
      fileIds: this.fileService.sortDefault(content.files).map((file: File) => file.id),
      directoryIds: this.directoryService.sortDefault(content.directories).map((directory: Directory) => directory.id),
    };
  }
}
