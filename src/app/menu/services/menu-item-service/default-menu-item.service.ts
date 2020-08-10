import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityPartial } from 'src/app/core/ngrx/entity/entity';
import { ActionDescriptorService } from 'src/app/core/ngrx/services/action-descriptor-service/action-descriptor.service';
import { actionDescriptorServiceDep } from 'src/app/core/ngrx/services/action-descriptor-service/action-descriptor.service.dependency';

import { menuItemActions } from '../../store/menu-item/menu-item.actions';
import { MenuItem, MenuItems } from '../../store/menu-item/menu-item.state';

import { MenuItemService } from './menu-item.service';

@Injectable()
export class DefaultMenuItemService implements MenuItemService {
  constructor(
    private store: Store<MenuItems>,
    @Inject(actionDescriptorServiceDep.getToken()) private actionDescriptorService: ActionDescriptorService,
  ) {}

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
    if (menuItem.clickAction && !menuItem.isDisabled) {
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
    }
  }
}
