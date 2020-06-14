import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { fileSelectors } from 'src/app/filesystem/store/file/file.selectors';
import { Files } from 'src/app/filesystem/store/file/file.state';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabBarComponent implements OnInit {
  public fileIds$: Observable<Id[]>;

  constructor(private store: Store<Files>) {}

  public ngOnInit(): void {
    this.fileIds$ = this.store.pipe(select(fileSelectors.selectOpenedIds));
  }
}
