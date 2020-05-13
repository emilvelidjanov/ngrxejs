import { MenuFacade } from './menu.facade';
import { Injectable, Inject } from '@angular/core';
import { menuItemServiceDep } from '../menu-item-service/menu-item.service.dependency';
import { MenuItemService } from '../menu-item-service/menu-item.service';
import { menuServiceDep } from '../menu-service/menu.service.dependency';
import { MenuService } from '../menu-service/menu.service';
import { FilesystemFacade } from 'src/app/filesystem/services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from 'src/app/filesystem/services/filesystem-facade/filesystem.facade.dependency';
import { Id } from 'src/app/core/ngrx/entity';


@Injectable()
export class DefaultMenuFacade implements MenuFacade {

  constructor(
    @Inject(menuItemServiceDep.getToken()) private menuItemService: MenuItemService,
    @Inject(menuServiceDep.getToken) private menuService: MenuService,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
  ) {
    this.menuItemService.initMenuItems();
    this.menuService.initMenus();
  }

  resolveMenuItemClick(menuItemId: Id): void {
    switch (menuItemId) {
      case 'openProject':
        this.filesystemFacade.openProject();
        break;
    }
  }
}
