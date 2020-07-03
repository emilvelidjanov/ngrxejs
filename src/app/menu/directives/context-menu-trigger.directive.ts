import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { menuActions } from '../store/menu/menu.actions';
import { menuSelectors } from '../store/menu/menu.selectors';
import { Menu, Menus } from '../store/menu/menu.state';

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
      this.store
        .pipe(select(menuSelectors.selectEntityById, { id: this.contextMenuId }))
        .pipe(take(1))
        .subscribe((menu: Menu) => {
          this.store.dispatch(
            menuActions.openContextMenu({
              entity: menu,
              x: $event.x,
              y: $event.y,
            }),
          );
        });
    }
  }
}
