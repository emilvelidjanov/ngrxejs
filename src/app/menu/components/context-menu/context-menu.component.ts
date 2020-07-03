import { ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { menuActions } from '../../store/menu/menu.actions';
import { menuSelectors } from '../../store/menu/menu.selectors';
import { Menu, Menus } from '../../store/menu/menu.state';

@Component({
  selector: 'app-context-menu[menuId]',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent implements OnInit, OnDestroy {
  @Input() public menuId: Id;
  public menu$: Observable<Menu>;
  private unsubscribe: Subject<void>;
  @HostBinding('style.top') public top: string;
  @HostBinding('style.left') public left: string;

  constructor(private store: Store<Menus>) {
    this.unsubscribe = new Subject();
  }

  public ngOnInit(): void {
    this.menu$ = this.store.pipe(select(menuSelectors.selectEntityById, { id: this.menuId }));
    this.menu$.pipe(takeUntil(this.unsubscribe)).subscribe((menu: Menu) => {
      this.left = menu.x + 'px';
      this.top = menu.y + 'px';
    });
  }

  public offClick(): void {
    this.menu$.pipe(take(1)).subscribe((menu: Menu) => this.store.dispatch(menuActions.close({ entity: menu })));
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
