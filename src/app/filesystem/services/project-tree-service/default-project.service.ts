import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';

import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { FileItem } from '../../store/file-item/file-item.state';
import { projectTreeActions } from '../../store/project-tree/project-tree.actions';
import { projectTreeSelectors } from '../../store/project-tree/project-tree.selectors';
import { ProjectTree, ProjectTrees } from '../../store/project-tree/project-tree.state';
import { Project } from '../../store/project/project.state';

import { ProjectTreeService } from './project.service';

@Injectable()
export class DefaultProjectTreeService implements ProjectTreeService {
  constructor(private store: Store<ProjectTrees>) {}

  public createFromPartial(partial: EntityPartial<ProjectTree>): ProjectTree {
    return { ...partial } as ProjectTree;
  }

  public selectById(id: Id): Observable<ProjectTree> {
    return this.store.pipe(select(projectTreeSelectors.selectEntityById, { id }));
  }

  public populateOptionals(partialProjectTrees: Partial<ProjectTree>[]): ProjectTree[] {
    const result: ProjectTree[] = partialProjectTrees.map((projectTree: ProjectTree) => {
      if (projectTree.projectId === undefined) {
        projectTree.projectId = null;
      }
      if (projectTree.fileItemIds === undefined) {
        projectTree.fileItemIds = [];
      }
      if (projectTree.directoryItemIds === undefined) {
        projectTree.directoryItemIds = [];
      }
      if (projectTree.contextMenuId === undefined) {
        projectTree.contextMenuId = null;
      }
      return { ...projectTree };
    });
    return result;
  }

  public updateOpenedProject(
    projectTree: ProjectTree,
    project: Project,
    directoryItems: DirectoryItem[],
    fileItems: FileItem[],
  ) {
    this.store.dispatch(
      projectTreeActions.updateOne({
        update: {
          id: projectTree.id as string,
          changes: {
            projectId: project.id,
            directoryItemIds: directoryItems.map((directoryItem: DirectoryItem) => directoryItem.id),
            fileItemIds: fileItems.map((fileItem: FileItem) => fileItem.id),
          },
        },
      }),
    );
  }

  public addMany(projectTrees: ProjectTree[]) {
    this.store.dispatch(projectTreeActions.addMany({ entities: projectTrees }));
  }
}
