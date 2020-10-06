import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, share, startWith, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { fileSelectors } from 'src/app/filesystem/store/file/file.selectors';
import { File } from 'src/app/filesystem/store/file/file.state';

import { EditorViewService } from '../../services/editor-view-service/editor-view.service';
import { editorViewServiceDep } from '../../services/editor-view-service/editor-view.service.dependency';
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
  @ViewChild('textarea') public textareaRef: ElementRef<HTMLDivElement>;

  @Input() public editorId: Id;
  public editor$: Observable<Editor>;
  public focusedFile$: Observable<File>;
  public inputSyncSubject$: Subject<string>;
  public inputSync$: Observable<void>;
  public whiteSpace$: Observable<string>;
  public updateContent$: Observable<void>;
  public hidden$: Observable<boolean>;

  constructor(private store: Store<Editors>, @Inject(editorViewServiceDep.getToken()) private editorViewService: EditorViewService) {}

  public ngOnInit(): void {
    this.editor$ = this.store.pipe(select(editorSelectors.selectEntityById, { id: this.editorId }), share());
    this.focusedFile$ = this.editor$.pipe(
      filter((editor) => !!editor),
      switchMap((editor) => this.store.pipe(select(fileSelectors.selectEntityById, { id: editor.focusedFileId }))),
      share(),
    );
    this.whiteSpace$ = combineLatest([this.focusedFile$, this.editor$]).pipe(
      map(([file, editor]) => this.editorViewService.getWhiteSpaceCSS(file, editor)),
    );
    this.updateContent$ = combineLatest([this.focusedFile$, this.editor$]).pipe(
      map(([file, editor]) => [editor, file ? file.content : ''] as [Editor, string]),
      map(([editor, content]) => this.editorViewService.setContentWithCurrentSelection(this.textareaRef.nativeElement, content, editor)),
    );
    this.inputSyncSubject$ = new Subject();
    this.inputSync$ = this.inputSyncSubject$.asObservable().pipe(
      debounceTime(500),
      withLatestFrom(this.focusedFile$),
      filter(([, file]) => !!file),
      map(([content, file]) => this.store.dispatch(editorActions.syncContentToFile({ entity: file, content }))),
    );
    this.hidden$ = this.focusedFile$.pipe(
      map((file) => !file),
      startWith(true),
    );
  }

  @HostListener('click')
  public onClick() {
    this.editor$.pipe(take(1)).subscribe((editor) => this.store.dispatch(editorActions.onClick({ entity: editor })));
  }

  public onInput($event: InputEvent) {
    if (this.textareaRef) {
      this.editorViewService.executeInputEventStrategies($event, this.textareaRef.nativeElement);
      this.inputSyncSubject$.next(this.textareaRef.nativeElement.innerHTML);
    }
  }

  public onKeydown($event: KeyboardEvent) {
    if (this.textareaRef) {
      this.editorViewService.executeKeyboardEventStrategies($event, this.textareaRef.nativeElement);
    }
  }
}
