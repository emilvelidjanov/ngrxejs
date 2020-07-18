import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { projectTreeSelectors } from '../../store/project-tree/project-tree.selectors';
import { ProjectTree } from '../../store/project-tree/project-tree.state';
import { projectSelectors } from '../../store/project/project.selectors';
import { Project, Projects } from '../../store/project/project.state';

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

  constructor(private store: Store<Projects>) {}

  public ngOnInit(): void {
    this.projectTree$ = this.store.pipe(select(projectTreeSelectors.selectEntityById, { id: this.projectTreeId }));
    this.project$ = this.projectTree$.pipe(
      filter((projectTree: ProjectTree) => !!projectTree),
      switchMap((projectTree: ProjectTree) =>
        this.store.pipe(select(projectSelectors.selectEntityById, { id: projectTree.projectId })),
      ),
    );
  }
}
