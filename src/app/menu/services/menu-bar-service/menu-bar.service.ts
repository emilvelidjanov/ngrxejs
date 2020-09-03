import { EntityPartial } from 'src/app/core/ngrx/entity/entity';
import { EntityService } from 'src/app/core/ngrx/services/entity.service';

import { MenuBar } from '../../store/menu-bar/menu-bar.state';

export interface MenuBarService extends EntityService<MenuBar> {}
