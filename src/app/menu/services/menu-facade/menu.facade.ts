import { Id } from 'src/app/core/ngrx/entity';


export interface MenuFacade {

  resolveMenuItemClick(menuItemId: Id): void;
}
