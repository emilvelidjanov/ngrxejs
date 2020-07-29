import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { tabItemSelectors } from '../../store/tab-item/tab-item.selectors';
import { TabItem, TabItems } from '../../store/tab-item/tab-item.state';

@Component({
  selector: 'app-tab-item[tabItemId]',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabItemComponent implements OnInit {
  @Input() private tabItemId: Id;
  public tabItem$: Observable<TabItem>;

  constructor(private store: Store<TabItems>) {}

  public ngOnInit(): void {
    this.tabItem$ = this.store.pipe(select(tabItemSelectors.selectEntityById, { id: this.tabItemId }));
  }
}
