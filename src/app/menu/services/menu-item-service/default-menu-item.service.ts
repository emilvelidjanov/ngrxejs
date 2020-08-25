import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';
import { Prop, Update } from 'src/app/core/ngrx/entity/entity-domain-state/props';
import { ActionDescriptorService } from 'src/app/core/ngrx/services/action-descriptor-service/action-descriptor.service';
import { actionDescriptorServiceDep } from 'src/app/core/ngrx/services/action-descriptor-service/action-descriptor.service.dependency';

import { menuItemActions } from '../../store/menu-item/menu-item.actions';
import { menuItemSelectors } from '../../store/menu-item/menu-item.selectors';
import { MenuItem, MenuItems } from '../../store/menu-item/menu-item.state';

import { MenuItemService } from './menu-item.service';

@Injectable()
export class DefaultMenuItemService implements MenuItemService {
  constructor(
    private store: Store<MenuItems>,
    @Inject(actionDescriptorServiceDep.getToken()) private actionDescriptorService: ActionDescriptorService,
  ) {}

  public selectByIds(ids: Id[]): Observable<MenuItem[]> {
    return this.store.pipe(select(menuItemSelectors.selectEntitiesByIds, { ids }));
  }

  public selectAllNested(menuItems: MenuItem[]): Observable<MenuItem[]> {
    const ids = menuItems.map((menuItem) => menuItem.menuItemIds).flat();
    if (!ids.length) {
      return of([]);
    }
    const menuItems$ = this.selectByIds(ids);
    const nested$ = menuItems$.pipe(
      filter((menuItems) => !!menuItems.length),
      switchMap((menuItems) => this.selectAllNested(menuItems)),
    );
    const combine$ = combineLatest([menuItems$, nested$]).pipe(map(([menuItems, nested]) => [...menuItems, ...nested]));
    return combine$;
  }

  public createFromPartial(partial: EntityPartial<MenuItem>): MenuItem {
    const menuItem: MenuItem = {
      label: null,
      clickAction: null,
      menuItemIds: [],
      openType: 'click',
      isOpened: false,
      preSymbol: null,
      postSymbol: null,
      isDisabled: false,
      isContextAware: false,
      ...partial,
    };
    return menuItem;
  }

  public addMany(menuItems: MenuItem[]): void {
    if (menuItems && menuItems.length) {
      this.store.dispatch(menuItemActions.addMany({ entities: menuItems }));
    }
  }

  public open(menuItem: MenuItem): void {
    if (menuItem.menuItemIds && menuItem.menuItemIds.length && !menuItem.isOpened && !menuItem.isDisabled) {
      this.store.dispatch(
        menuItemActions.updateOne({
          update: {
            id: menuItem.id,
            changes: {
              isOpened: true,
            },
          },
        }),
      );
    }
  }

  public toggleOpened(menuItem: MenuItem): void {
    if (!menuItem.isOpened) {
      this.open(menuItem);
    } else {
      if ((menuItem.menuItemIds && menuItem.menuItemIds.length) || menuItem.isOpened) {
        this.store.dispatch(
          menuItemActions.updateOne({
            update: {
              id: menuItem.id,
              changes: {
                isOpened: false,
              },
            },
          }),
        );
      }
    }
  }

  public dispatchClickAction(menuItem: MenuItem): void {
    if (!menuItem.isDisabled) {
      this.actionDescriptorService.dispatch(menuItem.clickAction, this.store);
    }
  }

  public closeAll(): void {
    this.store.dispatch(
      menuItemActions.updateAll({
        partial: {
          isOpened: false,
        },
      }),
    );
  }

  public updateIsDisabled(isDisabled: boolean, menuItem: MenuItem): void {
    if (menuItem.isDisabled !== isDisabled) {
      this.store.dispatch(
        menuItemActions.updateOne({
          update: {
            id: menuItem.id,
            changes: {
              isDisabled,
            },
          },
        }),
      );
      if (menuItem.menuItemIds && menuItem.menuItemIds.length) {
        this.store.dispatch(
          menuItemActions.updateManySame({
            ids: menuItem.menuItemIds,
            partial: {
              isDisabled,
            },
          }),
        );
      }
    }
  }

  public upsertOnClickActionProps(props: Prop, menuItems: MenuItem[]): void {
    if (menuItems && props) {
      const contextAwareMenuItems = menuItems.filter((menuItem) => !!menuItem.clickAction && menuItem.isContextAware);
      if (contextAwareMenuItems.length) {
        const updates = contextAwareMenuItems.map((menuItem) => {
          const update: Update<MenuItem> = {
            id: menuItem.id,
            changes: {
              clickAction: {
                type: menuItem.clickAction.type,
                props: {
                  ...menuItem.clickAction.props,
                  ...props,
                },
              },
            },
          };
          return update;
        });
        this.store.dispatch(menuItemActions.updateMany({ updates }));
      }
    }
  }
}
