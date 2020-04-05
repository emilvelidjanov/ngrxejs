export class MenuItem {

    public label?: string = '';
    public nestedMenuItems?: MenuItem[] = [];
    public click?: ($event?: MouseEvent) => void = undefined;

    constructor(menuItem?: MenuItem) {
        if (menuItem) {
            if (menuItem.label) this.label = menuItem.label;
            if (menuItem.nestedMenuItems) this.nestedMenuItems = menuItem.nestedMenuItems;
            if (menuItem.click) this.click = menuItem.click;
        }
    }
}
