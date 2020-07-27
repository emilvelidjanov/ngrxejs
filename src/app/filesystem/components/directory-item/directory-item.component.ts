import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, share, switchMap, take, tap } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { directoryItemActions } from '../../store/directory-item/directory-item.actions';
import { directoryItemSelectors } from '../../store/directory-item/directory-item.selectors';
import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { directorySelectors } from '../../store/directory/directory.selectors';
import { Directories, Directory } from '../../store/directory/directory.state';
import { projectTreeSelectors } from '../../store/project-tree/project-tree.selectors';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

@Component({
  selector: 'app-directory-item[directoryItemId]',
  templateUrl: './directory-item.component.html',
  styleUrls: ['./directory-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectoryItemComponent implements OnInit {
  @Input() public directoryItemId: Id;
  public directoryItem$: Observable<DirectoryItem>;
  public directory$: Observable<Directory>;
  public projectTree$: Observable<ProjectTree>;

  constructor(private store: Store<Directories>) {}

  public ngOnInit(): void {
    this.directoryItem$ = this.store.pipe(
      select(directoryItemSelectors.selectEntityById, { id: this.directoryItemId }),
    );
    this.directory$ = this.directoryItem$.pipe(
      filter((directoryItem) => !!directoryItem && !!directoryItem.directoryId),
      switchMap((directoryItem) =>
        this.store.pipe(select(directorySelectors.selectEntityById, { id: directoryItem.directoryId })),
      ),
    );
    this.projectTree$ = this.directoryItem$.pipe(
      filter((directoryItem) => !!directoryItem && !!directoryItem.projectTreeId),
      switchMap((directoryItem) =>
        this.store.pipe(select(projectTreeSelectors.selectEntityById, { id: directoryItem.projectTreeId })),
      ),
    );
  }

  public open(): void {
    this.directoryItem$
      .pipe(take(1))
      .subscribe((directoryItem) => this.store.dispatch(directoryItemActions.open({ entity: directoryItem })));
  }
}
