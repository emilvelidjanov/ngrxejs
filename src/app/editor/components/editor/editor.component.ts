import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { fileSelectors } from 'src/app/filesystem/store/file/file.selectors';
import { File } from 'src/app/filesystem/store/file/file.state';

import { editorActions } from '../../store/editor/editor.actions';
import { editorSelectors } from '../../store/editor/editor.selectors';
import { Editor, Editors } from '../../store/editor/editor.state';

@Component({
  selector: 'app-editor[editorId]',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit {
  @Input() public editorId: Id;
  public editor$: Observable<Editor>;
  public focusedFile$: Observable<File>;
  public whiteSpace: string;

  constructor(private store: Store<Editors>) {}

  public ngOnInit(): void {
    this.editor$ = this.store.pipe(select(editorSelectors.selectEntityById, { id: this.editorId }));
    this.focusedFile$ = this.editor$.pipe(
      filter((editor) => !!editor && !!editor.focusedFileId),
      switchMap((editor) => this.store.pipe(select(fileSelectors.selectEntityById, { id: editor.focusedFileId }))),
      filter((file) => file.isLoaded),
    );
    this.focusedFile$.subscribe(
      (focusedFile) => (this.whiteSpace = focusedFile.extension.includes('html') ? 'initial' : 'pre-wrap'),
    );
  }

  @HostListener('click')
  public onClick() {
    this.editor$.pipe(take(1)).subscribe((editor) => this.store.dispatch(editorActions.onClick({ entity: editor })));
  }
}
