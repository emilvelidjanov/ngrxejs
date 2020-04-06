import { MenuItemState } from './menu-item.state';


export interface MenuState {
  title: string;
  logo: string;
  menuItems: MenuItemState[];
}

export const initialState: MenuState = {
  title: '',
  logo: '',
  menuItems: []
};