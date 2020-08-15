import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Prop } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { contextMenuActions } from '../store/context-menu/context-menu.actions';
import { contextMenuSelectors } from '../store/context-menu/context-menu.selectors';
import { ContextMenus } from '../store/context-menu/context-menu.state';

@Directive({
  selector: '[appContextMenuTrigger]',
})
export class ContextMenuTriggerDirective implements OnInit {
  @Input('appContextMenuTrigger') public contextMenuId: string;
  @Input() public appContextProps: Prop;

  constructor(private store: Store<ContextMenus>) {}

  public ngOnInit(): void {}

  @HostListener('contextmenu', ['$event'])
  public onContextMenu($event: MouseEvent): void {
    $event.stopPropagation();
    if (this.contextMenuId && this.contextMenuId.length) {
      this.store
        .pipe(select(contextMenuSelectors.selectEntityById, { id: this.contextMenuId }), take(1))
        .subscribe((contextMenu) => {
          this.store.dispatch(
            contextMenuActions.open({
              entity: contextMenu,
              x: $event.x,
              y: $event.y,
              props: this.appContextProps,
            }),
          );
        });
    }
  }
}
