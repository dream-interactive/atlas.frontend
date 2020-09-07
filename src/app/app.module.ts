import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {ToolbarModule} from './components/toolbar/toolbar.module';
import {ExampleModule} from './components/example/example.module';
import {HttpClientModule} from '@angular/common/http';
import {AtlasModule} from './components/atlas/atlas.module';

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
    ExampleModule,
    HttpClientModule,
    AtlasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
