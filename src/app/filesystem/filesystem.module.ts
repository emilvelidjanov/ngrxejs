import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FileItemComponent } from './components/file-item/file-item.component';
import { FileTreeComponent } from './components/file-tree/file-tree.component';
import { fileServiceDep } from './services/file-service/file.service.dependency';
import { filesystemFacadeDep } from './services/filesystem-facade/filesystem.facade.dependency';
import { filesystemServiceDep } from './services/filesystem-service/filesystem.service.dependency';
import { projectServiceDep } from './services/project-service/project.service.dependency';
import { filesystemFeatureKey, metaReducers, reducers } from './store';
import { FileEffects } from './store/file/file.effects';
import { ProjectEffects } from './store/project/project.effects';

@NgModule({
  declarations: [FileTreeComponent, FileItemComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(filesystemFeatureKey, reducers, { metaReducers }),
    EffectsModule.forFeature([ProjectEffects, FileEffects]),
  ],
  exports: [FileTreeComponent],
})
export class FilesystemModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: FilesystemModule,
      providers: [
        filesystemServiceDep.getProvider(),
        filesystemFacadeDep.getProvider(),
        fileServiceDep.getProvider(),
        projectServiceDep.getProvider(),
      ],
    };
  }
}
