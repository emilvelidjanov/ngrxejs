import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { editorActions } from 'src/app/editor/store/editor/editor.actions';

import { fileItemSelectors } from '../../store/file-item/file-item.selectors';
import { FileItem } from '../../store/file-item/file-item.state';
import { fileSelectors } from '../../store/file/file.selectors';
import { File, Files } from '../../store/file/file.state';

@Component({
  selector: 'app-file-item[fileItemId]',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileItemComponent implements OnInit {
  @Input() public fileItemId: Id;
  public fileItem$: Observable<FileItem>;
  public file$: Observable<File>;

  constructor(private store: Store<Files>) {}

  public ngOnInit(): void {
    this.fileItem$ = this.store.pipe(select(fileItemSelectors.selectEntityById, { id: this.fileItemId }));
    this.file$ = this.fileItem$.pipe(
      filter((fileItem: FileItem) => !!fileItem),
      switchMap((fileItem: FileItem) =>
        this.store.pipe(select(fileSelectors.selectEntityById, { id: fileItem.fileId })),
      ),
    );
  }

  public openFile(): void {
    this.file$.pipe(take(1)).subscribe((file: File) => this.store.dispatch(editorActions.openFile({ entity: file })));
  }
}
