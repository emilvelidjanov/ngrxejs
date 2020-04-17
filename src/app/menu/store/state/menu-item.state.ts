export interface MenuItemState {
  label?: string;
  nestedMenuItems?: MenuItemState[];
  click?: ($event: MouseEvent) => void;
}

export function clone(menuItemState: MenuItemState, click?: ($event: MouseEvent) => void): MenuItemState {
  return {
    ...menuItemState,
    nestedMenuItems: menuItemState.nestedMenuItems ?
      menuItemState.nestedMenuItems.map((menuItemState: MenuItemState) => clone(menuItemState, menuItemState.click)) : [],
    click: click,
  }
}