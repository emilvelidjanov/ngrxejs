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
import { OpenDialogResult } from '../filesystem-service/filesystem.service';

import { ProjectService } from './project.service';

@Injectable()
export class DefaultProjectService implements ProjectService {
  private projectIds$: Observable<Id[]>;

  constructor(
    private store: Store<Projects>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
  ) {
    this.projectIds$ = this.store.pipe(select(projectSelectors.selectIds));
  }

  public createOne(openDialogResult: OpenDialogResult, files: File[], directories: Directory[]): Observable<Project> {
    const project$ = this.projectIds$.pipe(
      map((ids: Id[]) => this.idGeneratorService.nextId(ids)),
      map((nextId: Id) => this.mapToProject(nextId, openDialogResult, files, directories)),
      take(1),
    );
    return project$;
  }

  public set(project: Project): void {
    this.store.dispatch(projectActions.setAll({ entities: [project] }));
  }

  private mapToProject(id: Id, openDialogResult: OpenDialogResult, files: File[], directories: Directory[]): Project {
    return {
      id,
      directory: openDialogResult.filePaths[0],
      name: openDialogResult.filenames[0],
      fileIds: files.map((file: File) => file.id),
      directoryIds: directories.map((directory: Directory) => directory.id),
    };
  }
}
