import { ProjectService } from './project.service';
import { OpenDialogResult } from '../filesystem-service/filesystem.service';
import { Project, Projects } from '../../store/project/project.state';
import { File } from '../../store/file/file.state';
import { Store, select } from '@ngrx/store';
import { Inject } from '@angular/core';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { projectSelectors } from '../../store/project/project.selector';
import { Id } from 'src/app/core/ngrx/entity';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { projectActions } from '../../store/project/project.action';


export class DefaultProjectService implements ProjectService {

  private projectIds$: Observable<Id[]>;

  constructor(
    private store: Store<Projects>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
  ) {
    this.projectIds$ = this.store.pipe(select(projectSelectors.selectIds));
  }

  createProject(openDialogResult: OpenDialogResult, files: File[]): Observable<Project> {
    if (openDialogResult.filePaths.length != 1) {
      throw new Error(`Cannot create project: OpenDialogResult has ${openDialogResult.filePaths.length} entries.`);
    }
    const project$ = this.projectIds$.pipe(
      map((ids: Id[]) => this.idGeneratorService.nextId(ids)),
      map((nextId: Id) => this.mapToProject(nextId, openDialogResult, files)),
      take(1)
    )
    return project$;
  }

  dispatchOpenedProject(project: Project): void {
    this.store.dispatch(projectActions.setAll({entities: [project]}));
    this.store.dispatch(projectActions.setOpenProjectId({id: project.id}));
  }

  private mapToProject(id: Id, openDialogResult: OpenDialogResult, files: File[]): Project {
    return {
      id: id,
      directory: openDialogResult.filePaths[0],
      name: openDialogResult.filenames[0],
      fileIds: files.map((file: File) => file.id),
    }
  }
}