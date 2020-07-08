import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { menuBarSelectors } from '../../store/menu-bar/menu-bar.selectors';
import { MenuBar, MenuBars } from '../../store/menu-bar/menu-bar.state';

@Component({
  selector: 'app-menu-bar[menuBarId]',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBarComponent implements OnInit {
  @Input() private menuBarId: Id;
  public menuBar$: Observable<MenuBar>;

  constructor(private store: Store<MenuBars>) {}

  public ngOnInit(): void {
    this.menuBar$ = this.store.pipe(select(menuBarSelectors.selectEntityById, { id: this.menuBarId }));
  }
}
