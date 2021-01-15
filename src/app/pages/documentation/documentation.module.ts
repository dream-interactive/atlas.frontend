import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentationComponent} from './documentation.component';
import {DocRoutingModule} from '../../routes/doc-routing.module';
import {MaterialModule} from '../../material.module';
import {FlexModule} from '@angular/flex-layout';
import {BrowserModule} from '@angular/platform-browser';
import {ExcModule} from './exc/exc.module';


@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    CommonModule,
    DocRoutingModule,
    MaterialModule,
    FlexModule,
    BrowserModule,
    ExcModule
  ],
  exports: [
    DocumentationComponent
  ]
})
export class DocumentationModule {
}
