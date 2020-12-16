import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocTitleComponent } from './doc-title.component';



@NgModule({
  declarations: [DocTitleComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DocTitleComponent
  ]
})
export class DocTitleModule { }
