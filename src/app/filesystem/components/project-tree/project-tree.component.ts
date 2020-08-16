import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, share, switchMap } from 'rxjs/operators';
import { PropId } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { directoryItemSelectors } from '../../store/directory-item/directory-item.selectors';
import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { projectTreeSelectors } from '../../store/project-tree/project-tree.selectors';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

@Component({
  selector: 'app-project-tree[projectTreeId]',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTreeComponent implements OnInit {
  @Input() public projectTreeId: string;
  public projectTree$: Observable<ProjectTree>;
  public rootDirectoryItem$: Observable<DirectoryItem>;
  public contextProps$: Observable<PropId>;

  constructor(private store: Store<ProjectTree>) {}

  public ngOnInit(): void {
    this.projectTree$ = this.store.pipe(
      select(projectTreeSelectors.selectEntityById, { id: this.projectTreeId }),
      filter((projectTree) => !!projectTree),
      share(),
    );
    this.rootDirectoryItem$ = this.projectTree$.pipe(
      filter((projectTree) => !!projectTree.rootDirectoryItemId),
      switchMap((projectTree) =>
        this.store.pipe(select(directoryItemSelectors.selectEntityById, { id: projectTree.rootDirectoryItemId })),
      ),
      filter((directoryItem) => !!directoryItem),
    );
    this.contextProps$ = this.rootDirectoryItem$.pipe(
      filter((rootDirectoryItem) => !!rootDirectoryItem.id),
      map((rootDirectoryItem) => ({ id: rootDirectoryItem.id })),
    );
  }
}
