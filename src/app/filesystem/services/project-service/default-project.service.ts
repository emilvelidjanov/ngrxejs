import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EntityPartial, Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { Directory } from '../../store/directory/directory.state';
import { projectActions } from '../../store/project/project.actions';
import { projectSelectors } from '../../store/project/project.selectors';
import { Project, Projects } from '../../store/project/project.state';
import { DirectoryService } from '../directory-service/directory.service';
import { directoryServiceDep } from '../directory-service/directory.service.dependency';

import { ProjectService } from './project.service';

@Injectable()
export class DefaultProjectService implements ProjectService {
  private projectIds$: Observable<Id[]>;

  constructor(
    private store: Store<Projects>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
    @Inject(directoryServiceDep.getToken()) private directoryService: DirectoryService,
  ) {
    this.projectIds$ = this.store.pipe(select(projectSelectors.selectIds));
  }

  public selectByRootDirectoryPath(path: string): Observable<Project> {
    const selectDirectory$ = this.directoryService.selectByPath(path);
    const selectProject$ = selectDirectory$.pipe(switchMap((directory) => (directory ? this.selectByRootDirectory(directory) : of(null))));
    return selectProject$;
  }

  public createOneFromEntities(directory: Directory): Observable<Project> {
    const partial: IdLessPartial<Project> = {
      rootDirectoryId: directory.id,
    };
    return this.createOne(partial);
  }

  public createDefault(partial: EntityPartial<Project>): Project {
    const project: Project = {
      id: null,
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
