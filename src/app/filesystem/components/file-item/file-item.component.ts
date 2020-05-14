import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { File, Files } from '../../store/file/file.state';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { fileSelectors } from '../../store/file/file.selectors';
import { fileActions } from '../../store/file/file.actions';


@Component({
  selector: 'app-file-item[file]',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileItemComponent implements OnInit {

  @Input() file: File;
  nestedFiles$: Observable<File[]>;
  isOpenedDirectory$: Observable<boolean>;

  constructor(
    private store: Store<Files>,
  ) { }

  ngOnInit(): void {
    this.nestedFiles$ = this.store.pipe(select(fileSelectors.selectEntitiesByIds, { ids: this.file.fileIds }));
    this.isOpenedDirectory$ = this.store.pipe(select(fileSelectors.selectIsOpenedDirectoryId, { id: this.file.id }));
  }

  openDirectory(): void {
    if (this.file.isDirectory) {
      this.store.dispatch(fileActions.openDirectory({ entity: this.file }));
    }
  }
}
