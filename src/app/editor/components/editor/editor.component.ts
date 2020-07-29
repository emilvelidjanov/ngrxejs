import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';

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

  constructor(private store: Store<Editors>) {}

  public ngOnInit(): void {
    this.editor$ = this.store.pipe(select(editorSelectors.selectEntityById, { id: this.editorId }));
  }

  @HostListener('click')
  public onClick() {
    this.editor$.pipe(take(1)).subscribe((editor) => this.store.dispatch(editorActions.onClick({ entity: editor })));
  }
}
