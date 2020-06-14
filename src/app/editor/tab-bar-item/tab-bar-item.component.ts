import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { fileActions } from 'src/app/filesystem/store/file/file.actions';
import { fileSelectors } from 'src/app/filesystem/store/file/file.selectors';
import { File } from 'src/app/filesystem/store/file/file.state';

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
    this.store.dispatch(fileActions.setFocusedId({ id: this.fileId }));
  }
}
