import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, share, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { DomService } from 'src/app/core/services/DOM-service/dom.service';
import { domServiceDep } from 'src/app/core/services/DOM-service/dom.service.dependency';
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
  @ViewChild('textarea') public textareaRef: ElementRef<HTMLDivElement>;

  @Input() public editorId: Id;
  public editor$: Observable<Editor>;
  public focusedFile$: Observable<File>;
  public inputSyncSubject$: Subject<string>;
  public inputSync$: Observable<void>;
  public whiteSpace$: Observable<string>;
  public updateInnerHTML$: Observable<void>;

  constructor(private store: Store<Editors>, @Inject(domServiceDep.getToken()) private domService: DomService) {}

  public ngOnInit(): void {
    this.editor$ = this.store.pipe(select(editorSelectors.selectEntityById, { id: this.editorId }), share());
    this.focusedFile$ = this.editor$.pipe(
      filter((editor) => !!editor),
      switchMap((editor) => this.store.pipe(select(fileSelectors.selectEntityById, { id: editor.focusedFileId }))),
      share(),
    );
    this.whiteSpace$ = this.focusedFile$.pipe(map((file) => (file && file.extension && file.extension.includes('html') ? 'initial' : 'pre-wrap')));
    this.updateInnerHTML$ = this.focusedFile$.pipe(
      map((file) => (file ? file.content : '')),
      map((content) => {
        try {
          this.domService.updateInnerHTMLWithCurrentSelection(this.textareaRef.nativeElement, content);
        } catch {
          /* ignore */
        }
      }),
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
