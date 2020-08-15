import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, share, switchMap } from 'rxjs/operators';
import { PropId } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { directoryItemSelectors } from '../../store/directory-item/directory-item.selectors';
import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { directorySelectors } from '../../store/directory/directory.selectors';
import { Directory } from '../../store/directory/directory.state';
import { projectTreeSelectors } from '../../store/project-tree/project-tree.selectors';
import { ProjectTree } from '../../store/project-tree/project-tree.state';
import { projectSelectors } from '../../store/project/project.selectors';
import { Project } from '../../store/project/project.state';

@Component({
  selector: 'app-project-tree[projectTreeId]',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTreeComponent implements OnInit {
  @Input() public projectTreeId: string;
  public projectTree$: Observable<ProjectTree>;
  public project$: Observable<Project>;
  public rootDirectoryItem$: Observable<DirectoryItem>;
  public rootDirectory$: Observable<Directory>;
  public contextProps$: Observable<PropId>;

  constructor(private store: Store<ProjectTree>) {}

  public ngOnInit(): void {
    this.projectTree$ = this.store.pipe(
      select(projectTreeSelectors.selectEntityById, { id: this.projectTreeId }),
      filter((projectTree) => !!projectTree),
      share(),
    );
    this.project$ = this.projectTree$.pipe(
      filter((projectTree) => !!projectTree.projectId),
      switchMap((projectTree) =>
        this.store.pipe(select(projectSelectors.selectEntityById, { id: projectTree.projectId })),
      ),
      filter((project) => !!project),
    );
    this.rootDirectoryItem$ = this.projectTree$.pipe(
      filter((projectTree) => !!projectTree.rootDirectoryItemId),
      switchMap((projectTree) =>
        this.store.pipe(select(directoryItemSelectors.selectEntityById, { id: projectTree.rootDirectoryItemId })),
      ),
      filter((directoryItem) => !!directoryItem),
      share(),
    );
    this.rootDirectory$ = this.project$.pipe(
      filter((project) => !!project.rootDirectoryId),
      switchMap((project) =>
        this.store.pipe(select(directorySelectors.selectEntityById, { id: project.rootDirectoryId })),
      ),
    );
    this.contextProps$ = this.rootDirectoryItem$.pipe(
      filter((rootDirectoryItem) => !!rootDirectoryItem.id),
      map((rootDirectoryItem) => ({ id: rootDirectoryItem.id })),
    );
  }
}
