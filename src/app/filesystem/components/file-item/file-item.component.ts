import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity';

import { fileActions } from '../../store/file/file.actions';
import { fileSelectors } from '../../store/file/file.selectors';
import { File, Files } from '../../store/file/file.state';

@Component({
  selector: 'app-file-item[fileId]',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileItemComponent implements OnInit {
  @Input() public fileId: Id;
  public file$: Observable<File>;
  public isOpenedDirectory$: Observable<boolean>;

  constructor(private store: Store<Files>) {}

  public ngOnInit(): void {
    this.file$ = this.store.pipe(select(fileSelectors.selectEntityById, { id: this.fileId }));
    this.isOpenedDirectory$ = this.store.pipe(select(fileSelectors.selectIsOpenedDirectoryId, { id: this.fileId }));
  }

  public openDirectory(): void {
    this.file$
      .pipe(
        tap((file: File) => this.store.dispatch(fileActions.openDirectory({ entity: file }))),
        take(1),
      )
      .subscribe();
  }
}
