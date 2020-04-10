import { MenuItemState, clone as menuItemClone } from './menu-item.state';


export interface MenuState {
  title?: string;
  logo?: string;
  menuItems?: MenuItemState[];
}

export const initialState: MenuState = {
  title: '',
  logo: '',
  menuItems: []
};

export function clone(menuState: MenuState): MenuState {
  return {
    ...menuState,
    menuItems: menuState.menuItems ?
      menuState.menuItems.map((menuItem: MenuItemState) => menuItemClone(menuItem, menuItem.click)) : [],
  }
}