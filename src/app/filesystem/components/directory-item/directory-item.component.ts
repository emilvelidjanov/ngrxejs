import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { directoryItemActions } from '../../store/directory-item/directory-item.actions';
import { directoryItemSelectors } from '../../store/directory-item/directory-item.selectors';
import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { directorySelectors } from '../../store/directory/directory.selectors';
import { Directories, Directory } from '../../store/directory/directory.state';

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

  constructor(private store: Store<Directories>) {}

  public ngOnInit(): void {
    this.directoryItem$ = this.store.pipe(
      select(directoryItemSelectors.selectEntityById, { id: this.directoryItemId }),
    );
    this.directory$ = this.directoryItem$.pipe(
      filter((directoryItem: DirectoryItem) => !!directoryItem),
      switchMap((directoryItem: DirectoryItem) =>
        this.store.pipe(select(directorySelectors.selectEntityById, { id: directoryItem.directoryId })),
      ),
    );
  }

  public open(): void {
    this.directoryItem$
      .pipe(take(1))
      .subscribe((directoryItem: DirectoryItem) =>
        this.store.dispatch(directoryItemActions.open({ entity: directoryItem })),
      );
  }
}
