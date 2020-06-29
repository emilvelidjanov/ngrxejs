import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { menuActions } from '../store/menu/menu.actions';
import { Menus } from '../store/menu/menu.state';

@Directive({
  selector: '[appContextMenuTrigger]',
})
export class ContextMenuTriggerDirective implements OnInit {
  @Input('appContextMenuTrigger') public contextMenuId: string;

  constructor(private store: Store<Menus>) {}

  public ngOnInit(): void {}

  @HostListener('contextmenu', ['$event'])
  public onContextMenu($event: MouseEvent): void {
    if (this.contextMenuId) {
      $event.stopPropagation();
      this.store.dispatch(
        menuActions.openContextMenu({
          id: this.contextMenuId,
          x: $event.x,
          y: $event.y,
        }),
      );
    }
  }
}
