import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { EntityPartial, Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';
import { Prop, Update } from 'src/app/core/ngrx/entity/entity-domain-state/props';
import { ActionDescriptorService } from 'src/app/core/ngrx/services/action-descriptor-service/action-descriptor.service';
import { actionDescriptorServiceDep } from 'src/app/core/ngrx/services/action-descriptor-service/action-descriptor.service.dependency';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { uuidGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { menuItemActions } from '../../store/menu-item/menu-item.actions';
import { menuItemSelectors } from '../../store/menu-item/menu-item.selectors';
import { MenuItem, MenuItems } from '../../store/menu-item/menu-item.state';

import { MenuItemService } from './menu-item.service';

@Injectable()
export class DefaultMenuItemService implements MenuItemService {
  constructor(
    private store: Store<MenuItems>,
    @Inject(actionDescriptorServiceDep.getToken()) private actionDescriptorService: ActionDescriptorService,
    @Inject(uuidGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
  ) {}

  public createDefault(partial: EntityPartial<MenuItem>): MenuItem {
    const menuItem: MenuItem = {
      id: null,
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

  public createOne(partial: IdLessPartial<MenuItem>): Observable<MenuItem> {
    const uuid = this.idGeneratorService.nextId();
    return of(this.createDefault({ id: uuid, ...partial }));
  }

  public createMany(partials: IdLessPartial<MenuItem>[]): Observable<MenuItem[]> {
    const uuids = this.idGeneratorService.nextNIds(partials.length);
    const entities = uuids.map((uuid, index) => {
      const partial = partials[index];
      return this.createDefault({ id: uuid, ...partial });
    });
    return of(entities);
  }

  public addOne(entity: MenuItem): void {
    if (entity) {
      this.store.dispatch(menuItemActions.addOne({ entity }));
    }
  }

  public addMany(entities: MenuItem[]): void {
    if (entities && entities.length) {
      this.store.dispatch(menuItemActions.addMany({ entities }));
    }
  }

  public selectOne(id: Id): Observable<MenuItem> {
    return this.store.pipe(select(menuItemSelectors.selectEntityById, { id }));
  }

  public selectMany(ids: Id[]): Observable<MenuItem[]> {
    return this.store.pipe(select(menuItemSelectors.selectEntitiesByIds, { ids }));
  }

  public selectAllNested(menuItems: MenuItem[]): Observable<MenuItem[]> {
    const ids = menuItems.map((menuItem) => menuItem.menuItemIds).flat();
    if (!ids.length) {
      return of([]);
    }
    const menuItems$ = this.selectMany(ids);
    const nested$ = menuItems$.pipe(
      filter((menuItems) => !!menuItems.length),
      switchMap((menuItems) => this.selectAllNested(menuItems)),
    );
    const combine$ = combineLatest([menuItems$, nested$]).pipe(map(([menuItems, nested]) => [...menuItems, ...nested]));
    return combine$;
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
    } else if ((menuItem.menuItemIds && menuItem.menuItemIds.length) || menuItem.isOpened) {
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

  public dispatchClickAction(menuItem: MenuItem): void {
    if (!menuItem.isDisabled && menuItem.clickAction) {
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
