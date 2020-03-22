export class MenuItem {

    public label?: string;

    constructor(menuItem?: MenuItem) {
        this.label = '';
        if (menuItem) {
            if (menuItem.label) this.label = menuItem.label;
        }
    }
}
