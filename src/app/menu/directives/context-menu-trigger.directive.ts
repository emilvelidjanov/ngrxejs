import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { contextMenuActions } from '../store/context-menu/context-menu.actions';
import { contextMenuSelectors } from '../store/context-menu/context-menu.selectors';
import { ContextMenu, ContextMenus } from '../store/context-menu/context-menu.state';

@Directive({
  selector: '[appContextMenuTrigger]',
})
export class ContextMenuTriggerDirective implements OnInit {
  @Input('appContextMenuTrigger') public contextMenuId: string;

  constructor(private store: Store<ContextMenus>) {}

  public ngOnInit(): void {}

  @HostListener('contextmenu', ['$event'])
  public onContextMenu($event: MouseEvent): void {
    if (this.contextMenuId) {
      $event.stopPropagation();
      this.store
        .pipe(select(contextMenuSelectors.selectEntityById, { id: this.contextMenuId }))
        .pipe(take(1))
        .subscribe((contextMenu: ContextMenu) => {
          this.store.dispatch(
            contextMenuActions.open({
              entity: contextMenu,
              x: $event.x,
              y: $event.y,
            }),
          );
        });
    }
  }
}