import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {ToolbarModule} from './components/toolbar/toolbar.module';
import {HttpClientModule} from '@angular/common/http';
import {AtlasModule} from './components/atlas/atlas.module';
import {ProfileModule} from './components/profile/profile.module';
import { DarkDirective } from './dark.directive';

@NgModule({
  declarations: [
    AppComponent,
    DarkDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToolbarModule,
    HttpClientModule,
    AtlasModule,
    ProfileModule
  ],
  providers: [],
  exports: [
    DarkDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
