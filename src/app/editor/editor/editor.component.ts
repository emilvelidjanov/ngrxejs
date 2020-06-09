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
  public files$: Observable<File[]>;

  constructor(private store: Store<Files>) {
    this.files$ = this.store.pipe(select(fileSelectors.selectOpenedFiles));
  }

  public ngOnInit(): void {}
}
