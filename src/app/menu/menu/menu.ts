import { MenuItem } from '../menu-item/menu-item';

export class Menu {

    public title?: string;
    public logo?: string;
    public menuItems?: MenuItem[];

    constructor(menu?: Menu) {
        this.title = '';
        this.logo = undefined;
        this.menuItems = [];
        if (menu) {
            if (menu.title) this.title = menu.title;
            if (menu.logo) this.logo = menu.logo;
            if (menu.menuItems) this.menuItems = menu.menuItems;
        }
    }
}
