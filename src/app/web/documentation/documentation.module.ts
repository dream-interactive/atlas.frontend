import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material.module';
import {FlexModule} from '@angular/flex-layout';
import {BrowserModule} from '@angular/platform-browser';
import {DocumentationPageComponent} from './pages/documentaion-page/documentation-page.component';
import {ExceptionsPageModule} from './pages/exceptions-page/exceptions-page.module';
import {DocumentationRoutingModule} from './documentation-routing.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [DocumentationPageComponent],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule,


    MaterialModule,


    ExceptionsPageModule,
    DocumentationRoutingModule
  ]
})
export class DocumentationModule {
}
