import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {ToolbarModule} from './components/toolbar/toolbar.module';
import {HttpClientModule} from '@angular/common/http';
import {AtlasModule} from './view/atlas/atlas.module';
import {ProfileModule} from './view/profile/profile.module';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
