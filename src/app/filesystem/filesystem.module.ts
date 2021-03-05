import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CoreModule } from '../core/core.module';
import { MenuModule } from '../menu/menu.module';

import { DirectoryItemComponent } from './components/directory-item/directory-item.component';
import { FileItemComponent } from './components/file-item/file-item.component';
import { ProjectTreeComponent } from './components/project-tree/project-tree.component';
import { directoryItemServiceDep } from './services/directory-item-service/directory-item.service.dependency';
import { directoryServiceDep } from './services/directory-service/directory.service.dependency';
import { fileItemServiceDep } from './services/file-item-service/file-item.service.dependency';
import { fileServiceDep } from './services/file-service/file.service.dependency';
import { filesystemFacadeDep } from './services/filesystem-facade/filesystem.facade.dependency';
import { filesystemServiceDep } from './services/filesystem-service/filesystem.service.dependency';
import { projectServiceDep } from './services/project-service/project.service.dependency';
import { projectTreeServiceDep } from './services/project-tree-service/project-tree.service.dependency';
import { filesystemFeatureKey, metaReducers, reducers } from './store';
import { DirectoryItemEffects } from './store/directory-item/directory-item.effects';
import { FileItemEffects } from './store/file-item/file-item.effects';
import { ProjectTreeEffects } from './store/project-tree/project-tree.effects';

@NgModule({
  declarations: [ProjectTreeComponent, FileItemComponent, DirectoryItemComponent],
  imports: [
    CommonModule,
    CoreModule,
    MenuModule,
    StoreModule.forFeature(filesystemFeatureKey, reducers, { metaReducers }),
    EffectsModule.forFeature([ProjectTreeEffects, DirectoryItemEffects, FileItemEffects]),
  ],
  exports: [ProjectTreeComponent],
})
export class FilesystemModule {
  public static forRoot(): ModuleWithProviders<FilesystemModule> {
    return {
      ngModule: FilesystemModule,
      providers: [
        filesystemServiceDep.getProvider(), // TODO: don't expose services
        filesystemFacadeDep.getProvider(),
        fileServiceDep.getProvider(),
        fileItemServiceDep.getProvider(),
        directoryServiceDep.getProvider(),
        directoryItemServiceDep.getProvider(),
        projectServiceDep.getProvider(),
        projectTreeServiceDep.getProvider(),
      ],
    };
  }
}
