import { Observable } from 'rxjs';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';
import { Prop } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { MenuItem } from '../../store/menu-item/menu-item.state';

export interface MenuItemService {
  selectByIds(ids: Id[]): Observable<MenuItem[]>;
  selectAllNested(menuItems: MenuItem[]): Observable<MenuItem[]>;
  createFromPartial(partial: EntityPartial<MenuItem>): MenuItem;
  addMany(menuItems: MenuItem[]): void;
  open(menuItem: MenuItem): void;
  toggleOpened(menuItem: MenuItem): void;
  closeAll(): void;
  dispatchClickAction(menuItem: MenuItem): void;
  updateIsDisabled(isDisabled: boolean, menuItem: MenuItem): void;
  upsertOnClickActionProps(props: Prop, menuItems: MenuItem[]): void;
}
