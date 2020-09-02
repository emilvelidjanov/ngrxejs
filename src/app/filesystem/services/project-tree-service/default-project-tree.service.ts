import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityPartial, Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';

import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { projectTreeActions } from '../../store/project-tree/project-tree.actions';
import { projectTreeSelectors } from '../../store/project-tree/project-tree.selectors';
import { ProjectTree, ProjectTrees } from '../../store/project-tree/project-tree.state';
import { Project } from '../../store/project/project.state';

import { ProjectTreeService } from './project-tree.service';

@Injectable()
export class DefaultProjectTreeService implements ProjectTreeService {
  constructor(private store: Store<ProjectTrees>) {}

  public selectOneByDirectoryItem(directoryItem: DirectoryItem): Observable<ProjectTree> {
    return this.selectOne(directoryItem.projectTreeId);
  }

  public createDefault(partial: EntityPartial<ProjectTree>): ProjectTree {
    const projectTree: ProjectTree = {
      projectId: null,
      rootDirectoryItemId: null,
      contextMenuId: null,
      directoryItemContextMenuId: null,
      fileItemContextMenuIds: {},
      ...partial,
    };
    return projectTree;
  }

  // TODO: UUID implementation
  public createOne(partial: IdLessPartial<ProjectTree>): Observable<ProjectTree> {
    throw new Error('Method not implemented.');
  }

  public createMany(partials: IdLessPartial<ProjectTree>[]): Observable<ProjectTree[]> {
    throw new Error('Method not implemented.');
  }

  public addOne(entity: ProjectTree): void {
    if (entity) {
      this.store.dispatch(projectTreeActions.addOne({ entity }));
    }
  }

  public addMany(entities: ProjectTree[]): void {
    if (entities && entities.length) {
      this.store.dispatch(projectTreeActions.addMany({ entities }));
    }
  }

  public selectOne(id: Id): Observable<ProjectTree> {
    return this.store.pipe(select(projectTreeSelectors.selectEntityById, { id }));
  }

  public selectMany(ids: Id[]): Observable<ProjectTree[]> {
    return this.store.pipe(select(projectTreeSelectors.selectEntitiesByIds, { ids }));
  }

  public updateOpenedProject(projectTree: ProjectTree, project: Project, rootDirectoryItem: DirectoryItem): void {
    this.store.dispatch(
      projectTreeActions.updateOne({
        update: {
          id: projectTree.id,
          changes: {
            projectId: project.id,
            rootDirectoryItemId: rootDirectoryItem.id,
          },
        },
      }),
    );
  }
}
