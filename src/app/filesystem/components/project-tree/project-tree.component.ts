import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, share, switchMap, tap } from 'rxjs/operators';

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

  constructor(private store: Store<ProjectTree>) {}

  public ngOnInit(): void {
    this.projectTree$ = this.store.pipe(
      select(projectTreeSelectors.selectEntityById, { id: this.projectTreeId }),
      share(),
    );
    this.project$ = this.projectTree$.pipe(
      filter((projectTree) => !!projectTree && projectTree.projectId !== null),
      switchMap((projectTree) =>
        this.store.pipe(select(projectSelectors.selectEntityById, { id: projectTree.projectId })),
      ),
    );
    this.rootDirectoryItem$ = this.projectTree$.pipe(
      filter((projectTree) => !!projectTree && projectTree.rootDirectoryItemId !== null),
      switchMap((projectTree) =>
        this.store.pipe(select(directoryItemSelectors.selectEntityById, { id: projectTree.rootDirectoryItemId })),
      ),
    );
    this.rootDirectory$ = this.project$.pipe(
      filter((project) => !!project && project.rootDirectoryId !== null),
      switchMap((project) =>
        this.store.pipe(select(directorySelectors.selectEntityById, { id: project.rootDirectoryId })),
      ),
    );
  }
}
