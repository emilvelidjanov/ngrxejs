import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { buildSpecificModules } from "src/build-specifics/index";
import { AppComponent } from './app.component';
import { MenuModule } from './menu/menu.module';
import { FilesystemModule } from './filesystem/filesystem.module';
import { EditorModule } from './editor/editor.module';
import { MenuComponent } from './menu/menu/menu.component';
import { FilesystemComponent } from './filesystem/filesystem/filesystem.component';
import { EditorComponent } from './editor/editor/editor.component';

const routes: Routes = [
  { path: "", outlet: "menu", component: MenuComponent },
  { path: "", outlet: "filesystem", component: FilesystemComponent },
  { path: "", outlet: "editor", component: EditorComponent }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {}),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({}),
    buildSpecificModules,
    MenuModule.forRoot(),
    FilesystemModule.forRoot(),
    EditorModule.forRoot()
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
