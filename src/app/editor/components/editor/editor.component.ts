import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fileSelectors } from 'src/app/filesystem/store/file/file.selectors';
import { File, Files } from 'src/app/filesystem/store/file/file.state';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit {
  public file$: Observable<File>;

  constructor(private store: Store<Files>) {
    this.file$ = this.store.pipe(select(fileSelectors.selectFocusedEntity));
  }

  public ngOnInit(): void {}
}
