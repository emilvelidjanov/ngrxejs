import { Observable } from 'rxjs';
import { Prop } from 'src/app/core/ngrx/entity/entity-domain-state/props';
import { EntityService } from 'src/app/core/ngrx/services/entity.service';

import { MenuItem } from '../../store/menu-item/menu-item.state';

export interface MenuItemService extends EntityService<MenuItem> {
  selectAllNested(menuItems: MenuItem[]): Observable<MenuItem[]>;
  open(menuItem: MenuItem): void;
  toggleOpened(menuItem: MenuItem): void;
  closeAll(): void;
  dispatchClickAction(menuItem: MenuItem): void;
  updateIsDisabled(isDisabled: boolean, menuItem: MenuItem): void;
  upsertOnClickActionProps(props: Prop, menuItems: MenuItem[]): void;
}
