import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityPartial, Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';
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

  constructor(private store: Store<Projects>, @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService) {
    this.projectIds$ = this.store.pipe(select(projectSelectors.selectIds));
  }

  public createOneFromEntities(directory: Directory): Observable<Project> {
    const partial: IdLessPartial<Project> = {
      rootDirectoryId: directory.id,
    };
    return this.createOne(partial);
  }

  public createDefault(partial: EntityPartial<Project>): Project {
    const project: Project = {
      rootDirectoryId: null,
      ...partial,
    };
    return project;
  }

  public createOne(partial: IdLessPartial<Project>): Observable<Project> {
    const project$ = this.projectIds$.pipe(
      map((ids) => this.idGeneratorService.nextId(ids)),
      map((id) => this.createDefault({ id, ...partial })),
    );
    return project$;
  }

  public createMany(partials: IdLessPartial<Project>[]): Observable<Project[]> {
    const projects$ = this.projectIds$.pipe(
      map((ids) => this.idGeneratorService.nextNIds(partials.length, ids)),
      map((ids) => ids.map((id, index) => this.createDefault({ id, ...partials[index] }))),
    );
    return projects$;
  }

  public addMany(entities: Project[]): void {
    if (entities && entities.length) {
      this.store.dispatch(projectActions.addMany({ entities }));
    }
  }

  public selectOne(id: Id): Observable<Project> {
    return this.store.pipe(select(projectSelectors.selectEntityById, { id }));
  }

  public selectMany(ids: Id[]): Observable<Project[]> {
    return this.store.pipe(select(projectSelectors.selectEntitiesByIds, { ids }));
  }

  public addOne(entity: Project): void {
    if (entity) {
      this.store.dispatch(projectActions.addOne({ entity }));
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
