import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MenuModule } from '../menu/menu.module';

import { EditorComponent } from './components/editor/editor.component';
import { editorFacadeDep } from './services/editor-facade/editor.facade.dependency';
import { editorServiceDep } from './services/editor-service/editor.service.dependency';
import { editorFeatureKey, metaReducers, reducers } from './store';
import { EditorEffects } from './store/editor/editor.effects';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(editorFeatureKey, reducers, { metaReducers }),
    EffectsModule.forFeature([EditorEffects]),
    MenuModule,
  ],
  providers: [],
  exports: [EditorComponent],
})
export class EditorModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: EditorModule,
      providers: [editorServiceDep.getProvider(), editorFacadeDep.getProvider()],
    };
  }
}
