import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';
import { Prop } from 'src/app/core/ngrx/entity/entity-domain-state/props';
import { EntityService } from 'src/app/core/ngrx/services/entity.service';

import { ContextMenu } from '../../store/context-menu/context-menu.state';

export interface ContextMenuService extends EntityService<ContextMenu> {
  open(contextMenu: ContextMenu, x: number, y: number): void;
  closeAll(): void;
  close(contextMenu: ContextMenu): void;
  updateContextProps(props: Prop, contextMenu: ContextMenu): void;
}
