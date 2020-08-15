import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';
import { Prop } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { ContextMenu } from '../../store/context-menu/context-menu.state';

export interface ContextMenuService {
  createFromPartial(partial: EntityPartial<ContextMenu>): ContextMenu;
  addMany(contextMenus: ContextMenu[]): void;
  open(contextMenu: ContextMenu, x: number, y: number): void;
  closeAll(): void;
  close(contextMenu: ContextMenu): void;
  updateContextProps(props: Prop, contextMenu: ContextMenu): void;
}
