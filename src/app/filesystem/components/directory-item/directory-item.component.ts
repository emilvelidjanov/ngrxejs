import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { directoryActions } from '../../store/directory/directory.actions';
import { directorySelectors } from '../../store/directory/directory.selectors';
import { Directories, Directory } from '../../store/directory/directory.state';

@Component({
  selector: 'app-directory-item[directoryId]',
  templateUrl: './directory-item.component.html',
  styleUrls: ['./directory-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectoryItemComponent implements OnInit {
  @Input() public directoryId: Id;
  public directory$: Observable<Directory>;
  public isOpened$: Observable<boolean>;
  public readonly contextMenuId: string;

  constructor(private store: Store<Directories>) {
    this.contextMenuId = 'directoryContextMenu';
  }

  public ngOnInit(): void {
    this.directory$ = this.store.pipe(select(directorySelectors.selectEntityById, { id: this.directoryId }));
    this.isOpened$ = this.store.pipe(select(directorySelectors.selectIsOpenedId, { id: this.directoryId }));
  }

  public openDirectory(): void {
    this.directory$
      .pipe(
        tap((directory: Directory) => this.store.dispatch(directoryActions.openDirectory({ entity: directory }))),
        take(1),
      )
      .subscribe();
  }

  @HostListener('contextmenu', ['$event'])
  public onContextMenu($event: MouseEvent): void {
    $event.stopPropagation();
    this.store.dispatch(
      directoryActions.openContextMenu({
        id: this.contextMenuId,
        x: $event.x,
        y: $event.y,
      }),
    );
  }
}
