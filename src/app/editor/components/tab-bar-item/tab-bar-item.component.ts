import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { fileSelectors } from 'src/app/filesystem/store/file/file.selectors';
import { File } from 'src/app/filesystem/store/file/file.state';

import { editorActions } from '../../store/editor/editor.actions';

@Component({
  selector: 'app-tab-bar-item[fileId]',
  templateUrl: './tab-bar-item.component.html',
  styleUrls: ['./tab-bar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabBarItemComponent implements OnInit {
  @Input() public fileId: Id;
  public file$: Observable<File>;

  constructor(private store: Store<File>) {}

  public ngOnInit(): void {
    this.file$ = this.store.pipe(select(fileSelectors.selectEntityById, { id: this.fileId }));
  }

  public focusTab() {
    this.file$
      .pipe(
        tap((file: File) => this.store.dispatch(editorActions.openFile({ entity: file }))),
        take(1),
      )
      .subscribe();
  }

  public closeTab() {
    this.file$
      .pipe(
        tap((file: File) => this.store.dispatch(editorActions.closeFile({ entity: file }))),
        take(1),
      )
      .subscribe();
  }
}
