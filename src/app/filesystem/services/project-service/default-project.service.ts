import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { File } from '../../store/file/file.state';
import { projectActions } from '../../store/project/project.actions';
import { projectSelectors } from '../../store/project/project.selectors';
import { Project, Projects } from '../../store/project/project.state';
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
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
  ) {
    this.projectIds$ = this.store.pipe(select(projectSelectors.selectIds));
  }

  public createProject(openDialogResult: OpenDialogResult, files: File[]): Observable<Project> {
    if (openDialogResult.filePaths.length !== 1) {
      throw new Error(`Cannot create project: OpenDialogResult has ${openDialogResult.filePaths.length} entries.`);
    }
    const project$ = this.projectIds$.pipe(
      map((ids: Id[]) => this.idGeneratorService.nextId(ids)),
      map((nextId: Id) => this.mapToProject(nextId, openDialogResult, files)),
      take(1),
    );
    return project$;
  }

  public dispatchOpenedProject(project: Project): void {
    this.store.dispatch(projectActions.setAll({ entities: [project] }));
    this.store.dispatch(projectActions.setOpenProjectId({ id: project.id }));
  }

  private mapToProject(id: Id, openDialogResult: OpenDialogResult, files: File[]): Project {
    return {
      id,
      directory: openDialogResult.filePaths[0],
      name: openDialogResult.filenames[0],
      fileIds: this.fileService.sortFilesDefault(files).map((file: File) => file.id),
    };
  }
}
