export interface MenuItemState {
  label: string;
  nestedMenuItems: MenuItemState[];
  click: ($event: MouseEvent) => void;
}