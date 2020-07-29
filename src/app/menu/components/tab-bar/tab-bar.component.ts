import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { tabBarSelectors } from '../../store/tab-bar/tab-bar.selectors';
import { TabBar, TabBars } from '../../store/tab-bar/tab-bar.state';

@Component({
  selector: 'app-tab-bar[tabBarId]',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabBarComponent implements OnInit {
  @Input() private tabBarId: Id;
  public tabBar$: Observable<TabBar>;

  constructor(private store: Store<TabBars>) {}

  public ngOnInit(): void {
    this.tabBar$ = this.store.pipe(select(tabBarSelectors.selectEntityById, { id: this.tabBarId }));
  }
}
