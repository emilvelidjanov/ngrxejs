import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { contextMenuActions } from '../../store/context-menu/context-menu.actions';
import { contextMenuSelectors } from '../../store/context-menu/context-menu.selectors';
import { ContextMenu, ContextMenus } from '../../store/context-menu/context-menu.state';

@Component({
  selector: 'app-context-menu[contextMenuId]',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent implements OnInit {
  @Input() public contextMenuId: Id;
  public contextMenu$: Observable<ContextMenu>;
  @HostBinding('style.top') public top: string;
  @HostBinding('style.left') public left: string;

  constructor(private store: Store<ContextMenus>) {}

  public ngOnInit(): void {
    this.contextMenu$ = this.store.pipe(
      select(contextMenuSelectors.selectEntityById, { id: this.contextMenuId }),
      tap((contextMenu) => {
        this.left = contextMenu.x + 'px';
        this.top = contextMenu.y + 'px';
      }),
    );
  }

  public offClick(): void {
    this.contextMenu$
      .pipe(take(1))
      .subscribe((contextMenu) => this.store.dispatch(contextMenuActions.close({ entity: contextMenu })));
  }
}
