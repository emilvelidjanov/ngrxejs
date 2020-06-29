import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { editorActions } from 'src/app/editor/store/editor/editor.actions';

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
  public readonly contextMenuId: string;

  constructor(private store: Store<Files>) {
    this.contextMenuId = 'fileItemContextMenu';
  }

  public ngOnInit(): void {
    this.file$ = this.store.pipe(select(fileSelectors.selectEntityById, { id: this.fileId }));
  }

  public openFile(): void {
    this.file$
      .pipe(
        tap((file: File) => this.store.dispatch(editorActions.openFile({ entity: file }))),
        take(1),
      )
      .subscribe();
  }
}
