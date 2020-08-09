import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { DomService } from 'src/app/core/services/DOM-service/dom.service';
import { domServiceDep } from 'src/app/core/services/DOM-service/dom.service.dependency';

import { menuItemActions } from '../../store/menu-item/menu-item.actions';
import { menuItemSelectors } from '../../store/menu-item/menu-item.selectors';
import { MenuItem, MenuItems, OpenType } from '../../store/menu-item/menu-item.state';

@Component({
  selector: 'app-menu-item[menuItemId]',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent implements OnInit {
  @Input() public menuItemId: Id;
  public menuItem$: Observable<MenuItem>;
  public openDirClass: string;

  constructor(
    private elementRef: ElementRef,
    private store: Store<MenuItems>,
    @Inject(domServiceDep.getToken()) private domService: DomService,
  ) {}

  public ngOnInit(): void {
    this.menuItem$ = this.store.pipe(
      select(menuItemSelectors.selectEntityById, { id: this.menuItemId }),
      tap((menuItem) => (this.openDirClass = menuItem.openType === 'hover' ? 'open-right' : 'open-bottom')),
    );
  }

  public click(): void {
    this.menuItem$
      .pipe(
        take(1),
        filter((menuItem) => menuItem.openType === 'click'),
      )
      .subscribe((menuItem) => this.store.dispatch(menuItemActions.onClick({ entity: menuItem })));
  }

  public onOffHover(): void {
    this.menuItem$
      .pipe(
        take(1),
        filter((menuItem) => menuItem.openType === 'hover'),
      )
      .subscribe((menuItem) => this.store.dispatch(menuItemActions.onOffHover({ entity: menuItem })));
  }

  public offClickNestedMenuItems($event: MouseEvent): void {
    const target = $event.target as HTMLElement;
    const refElement = this.elementRef.nativeElement as HTMLElement;
    if (!this.domService.containsOrIsEqual(refElement, target)) {
      this.store.dispatch(menuItemActions.offClickNestedMenuItems());
    }
  }
}
