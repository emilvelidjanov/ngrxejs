import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';

import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { projectTreeActions } from '../../store/project-tree/project-tree.actions';
import { projectTreeSelectors } from '../../store/project-tree/project-tree.selectors';
import { ProjectTree, ProjectTrees } from '../../store/project-tree/project-tree.state';
import { Project } from '../../store/project/project.state';

import { ProjectTreeService } from './project-tree.service';

@Injectable()
export class DefaultProjectTreeService implements ProjectTreeService {
  constructor(private store: Store<ProjectTrees>) {}

  public updateRootDirectoryItem(directoryItem: DirectoryItem, projectTree: ProjectTree): void {
    if (projectTree.rootDirectoryItemId !== directoryItem.id) {
      this.store.dispatch(
        projectTreeActions.updateOne({
          update: {
            id: projectTree.id,
            changes: {
              rootDirectoryItemId: directoryItem.id,
            },
          },
        }),
      );
    }
  }

  public createFromPartial(partial: EntityPartial<ProjectTree>): ProjectTree {
    const projectTree: ProjectTree = {
      contextMenuId: null,
      directoryItemContextMenuId: null,
      rootDirectoryItemId: null,
      fileItemContextMenuIds: {},
      projectId: null,
      ...partial,
    };
    return projectTree;
  }

  public select(id: Id): Observable<ProjectTree> {
    return this.store.pipe(select(projectTreeSelectors.selectEntityById, { id }));
  }

  public updateOpenedProject(projectTree: ProjectTree, project: Project, rootDirectory: DirectoryItem): void {
    this.store.dispatch(
      projectTreeActions.updateOne({
        update: {
          id: projectTree.id,
          changes: {
            projectId: project.id,
            rootDirectoryItemId: rootDirectory.id,
          },
        },
      }),
    );
  }

  public addMany(projectTrees: ProjectTree[]): void {
    if (projectTrees && projectTrees.length) {
      this.store.dispatch(projectTreeActions.addMany({ entities: projectTrees }));
    }
  }
}
