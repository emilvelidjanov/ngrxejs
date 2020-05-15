import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { File, Files } from '../../store/file/file.state';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { fileSelectors } from '../../store/file/file.selectors';
import { fileActions } from '../../store/file/file.actions';
import { Id } from 'src/app/core/ngrx/entity';
import { tap, take } from 'rxjs/operators';


@Component({
  selector: 'app-file-item[fileId]',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileItemComponent implements OnInit {

  @Input() fileId: Id;
  file$: Observable<File>;
  isOpenedDirectory$: Observable<boolean>;

  constructor(
    private store: Store<Files>,
  ) { }

  ngOnInit(): void {
    this.file$ = this.store.pipe(select(fileSelectors.selectEntityById, { id: this.fileId }))
    this.isOpenedDirectory$ = this.store.pipe(select(fileSelectors.selectIsOpenedDirectoryId, { id: this.fileId }));
  }

  openDirectory(): void {
    this.file$.pipe(
      tap((file: File) => this.store.dispatch(fileActions.openDirectory({ entity: file }))),
      take(1),
    ).subscribe();
  }
}
