import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { Directory } from '../../store/directory/directory.state';
import { projectActions } from '../../store/project/project.actions';
import { projectSelectors } from '../../store/project/project.selectors';
import { Project, Projects } from '../../store/project/project.state';

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

  public createOne(rootDirectory: Directory): Observable<Project> {
    const project$ = this.projectIds$.pipe(
      map((ids) => this.idGeneratorService.nextId(ids)),
      map((id) => {
        const project: Project = {
          id,
          rootDirectoryId: rootDirectory.id,
        };
        return project;
      }),
      take(1),
    );
    return project$;
  }

  public addOne(project: Project): void {
    if (project) {
      this.store.dispatch(projectActions.addOne({ entity: project }));
    }
  }

  public selectByRootDirectory(directory: Directory): Observable<Project> {
    return this.store.pipe(
      select(projectSelectors.selectEntitiesByPredicate, {
        predicate: (entity) => entity.rootDirectoryId === directory.id,
      }),
      map((entities) => (entities.length ? entities[0] : null)),
    );
  }
}
