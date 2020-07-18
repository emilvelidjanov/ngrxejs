import { ContextMenu } from '../../store/context-menu/context-menu.state';

export interface ContextMenuService {
  populateOptionals(partialContextMenus: Partial<ContextMenu>[]): ContextMenu[];
  addMany(contextMenus: ContextMenu[]): void;
  open(contextMenu: ContextMenu): void;
  updatePosition(contextMenu: ContextMenu, x: number, y: number): void;
  closeAll(): void;
  close(contextMenu: ContextMenu): void;
}
