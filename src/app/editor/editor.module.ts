import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CoreModule } from '../core/core.module';
import { FilesystemModule } from '../filesystem/filesystem.module';
import { MenuModule } from '../menu/menu.module';

import { EditorComponent } from './components/editor/editor.component';
import { editorFacadeDep } from './services/editor-facade/editor.facade.dependency';
import { editorServiceDep } from './services/editor-service/editor.service.dependency';
import { editorViewServiceDep } from './services/editor-view-service/editor-view.service.dependency';
import { inputEventStrategiesDep, keyboardEventStrategiesDep } from './services/event-strategy/event.strategy.dependency';
import { editorFeatureKey, metaReducers, reducers } from './store';
import { EditorEffects } from './store/editor/editor.effects';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    CoreModule,
    MenuModule,
    FilesystemModule,
    StoreModule.forFeature(editorFeatureKey, reducers, { metaReducers }),
    EffectsModule.forFeature([EditorEffects]),
  ],
  providers: [editorViewServiceDep.getProvider(), keyboardEventStrategiesDep.getProvider(), inputEventStrategiesDep.getProvider()],
  exports: [EditorComponent],
})
export class EditorModule {
  public static forRoot(): ModuleWithProviders<EditorModule> {
    return {
      ngModule: EditorModule,
      providers: [editorServiceDep.getProvider(), editorFacadeDep.getProvider()],
    };
  }
}
