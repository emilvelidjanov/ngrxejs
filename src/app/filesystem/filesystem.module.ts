import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { filesystemFeatureKey, reducers, metaReducers } from './store';
import { FileTreeComponent } from './components/file-tree/file-tree.component';
import { filesystemServiceDep } from './services/filesystem-service/filesystem.service.dependency';
import { filesystemFacadeDep } from './services/filesystem-facade/filesystem.facade.dependency';
import { fileServiceDep } from './services/file-service/file.service.dependency';
import { projectServiceDep } from './services/project-service/project.service.dependency';
import { FileItemComponent } from './components/file-item/file-item.component';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './store/project/project.effects';
import { FileEffects } from './store/file/file.effects';


@NgModule({
  declarations: [FileTreeComponent, FileItemComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(filesystemFeatureKey, reducers, { metaReducers }),
    EffectsModule.forFeature([ProjectEffects, FileEffects]),
  ],
  exports: [FileTreeComponent]
})
export class FilesystemModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FilesystemModule,
      providers: [
        filesystemServiceDep.getProvider(),
        filesystemFacadeDep.getProvider(),
        fileServiceDep.getProvider(),
        projectServiceDep.getProvider(),
      ]
    };
  }
}
