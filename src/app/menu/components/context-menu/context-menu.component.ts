import { ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
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
export class ContextMenuComponent implements OnInit, OnDestroy {
  @Input() public contextMenuId: Id;
  public contextMenu$: Observable<ContextMenu>;
  private unsubscribe: Subject<void>;
  @HostBinding('style.top') public top: string;
  @HostBinding('style.left') public left: string;

  constructor(private store: Store<ContextMenus>) {
    this.unsubscribe = new Subject();
  }

  public ngOnInit(): void {
    this.contextMenu$ = this.store.pipe(select(contextMenuSelectors.selectEntityById, { id: this.contextMenuId }));
    this.contextMenu$.pipe(takeUntil(this.unsubscribe)).subscribe((contextMenu) => {
      this.left = contextMenu.x + 'px';
      this.top = contextMenu.y + 'px';
    });
  }

  public offClick(): void {
    this.contextMenu$
      .pipe(take(1))
      .subscribe((contextMenu) => this.store.dispatch(contextMenuActions.close({ entity: contextMenu })));
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
