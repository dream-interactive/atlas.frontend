import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeModule} from './home/home.module';
import {WebRoutingModule} from './web-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StartModule} from './start/start.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    StartModule,
    HomeModule,

    WebRoutingModule
  ]
})
export class WebModule { }
