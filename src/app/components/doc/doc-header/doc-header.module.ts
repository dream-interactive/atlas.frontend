import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocHeaderComponent } from './doc-header.component';
import {DocChapterComponent} from '../doc-chapter/doc-chapter.component';

@NgModule({
  declarations: [DocHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [DocHeaderComponent]
})
export class DocHeaderModule { }
