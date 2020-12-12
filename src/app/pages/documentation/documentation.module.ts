import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationComponent } from './documentation.component';
import {DocRoutingModule} from './doc-routing.module';
import {MaterialModule} from '../../material.module';



@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    CommonModule,
    DocRoutingModule,
    MaterialModule
  ],
  exports: [
    DocumentationComponent
  ]
})
export class DocumentationModule { }
