import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { PropId } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { directoryItemActions } from '../../store/directory-item/directory-item.actions';
import { directoryItemSelectors } from '../../store/directory-item/directory-item.selectors';
import { DirectoryItem, DirectoryItems } from '../../store/directory-item/directory-item.state';
import { directorySelectors } from '../../store/directory/directory.selectors';
import { Directory } from '../../store/directory/directory.state';
import { projectTreeSelectors } from '../../store/project-tree/project-tree.selectors';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

@Component({
  selector: 'app-directory-item[directoryItemId]',
  templateUrl: './directory-item.component.html',
  styleUrls: ['./directory-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectoryItemComponent implements OnInit, OnChanges {
  @Input() public directoryItemId: Id;
  public directoryItem$: Observable<DirectoryItem>;
  public directory$: Observable<Directory>;
  public projectTree$: Observable<ProjectTree>;
  public contextProps$: Observable<PropId>;

  constructor(private store: Store<DirectoryItems>) {}

  public ngOnInit(): void {
    this.directoryItem$ = this.store.pipe(
      select(directoryItemSelectors.selectEntityById, { id: this.directoryItemId }),
      filter((directoryItem) => !!directoryItem),
    );
    this.directory$ = this.directoryItem$.pipe(
      filter((directoryItem) => !!directoryItem.directoryId),
      switchMap((directoryItem) =>
        this.store.pipe(select(directorySelectors.selectEntityById, { id: directoryItem.directoryId })),
      ),
    );
    this.projectTree$ = this.directoryItem$.pipe(
      filter((directoryItem) => !!directoryItem.projectTreeId),
      switchMap((directoryItem) =>
        this.store.pipe(select(projectTreeSelectors.selectEntityById, { id: directoryItem.projectTreeId })),
      ),
    );
    this.contextProps$ = this.directoryItem$.pipe(
      filter((directoryItem) => !!directoryItem.id),
      map((directoryItem) => ({ id: directoryItem.id })),
    );
  }

  // TODO: not sure why this is necessary
  public ngOnChanges(): void {
    this.ngOnInit();
  }

  public open(): void {
    this.directoryItem$
      .pipe(take(1))
      .subscribe((directoryItem) => this.store.dispatch(directoryItemActions.open({ entity: directoryItem })));
  }
}
