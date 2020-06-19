import { Observable } from 'rxjs';

import { MenuItem } from '../../store/menu-item/menu-item.state';

export interface MenuItemService {
  addMany(menuItems: MenuItem[]): void;
  toggleOpened(menuItem: MenuItem): void;
  closeAll(): void;
  dispatchClickAction(menuItem: MenuItem): void;
  isOpened(menuItem): Observable<boolean>;
  getHtmlNodeName(): string;
}
