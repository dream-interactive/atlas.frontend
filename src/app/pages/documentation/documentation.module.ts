import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentationComponent} from './documentation.component';
import {DocRoutingModule} from '../../routes/doc-routing.module';
import {MaterialModule} from '../../material.module';
import {FlexModule} from '@angular/flex-layout';
import {BrowserModule} from '@angular/platform-browser';
import {ExceptionsModule} from './exceptions/exceptions.module';


@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    CommonModule,
    DocRoutingModule,
    MaterialModule,
    FlexModule,
    BrowserModule,
    ExceptionsModule
  ],
  exports: [
    DocumentationComponent
  ]
})
export class DocumentationModule {
}
