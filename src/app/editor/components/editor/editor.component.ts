import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, share, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
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
  public inputSyncSubject$: Subject<string>;
  public inputSync$: Observable<void>;

  constructor(private store: Store<Editors>) {}

  public ngOnInit(): void {
    this.editor$ = this.store.pipe(select(editorSelectors.selectEntityById, { id: this.editorId }), share());
    this.focusedFile$ = this.editor$.pipe(
      filter((editor) => !!editor),
      switchMap((editor) => this.store.pipe(select(fileSelectors.selectEntityById, { id: editor.focusedFileId }))),
      tap((file) => (this.whiteSpace = file && file.extension.includes('html') ? 'initial' : 'pre-wrap')),
      share(),
    );
    this.inputSyncSubject$ = new Subject();
    this.inputSync$ = this.inputSyncSubject$.asObservable().pipe(
      withLatestFrom(this.focusedFile$),
      filter(([, file]) => !!file),
      debounceTime(500),
      map(([content, file]) => this.store.dispatch(editorActions.syncContentToFile({ entity: file, content }))),
    );
  }

  @HostListener('click')
  public onClick() {
    this.editor$.pipe(take(1)).subscribe((editor) => this.store.dispatch(editorActions.onClick({ entity: editor })));
  }

  public onInput($event: KeyboardEvent) {
    const target = $event.target as HTMLElement;
    this.inputSyncSubject$.next(target.innerHTML);
  }
}
