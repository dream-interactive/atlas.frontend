import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocChapterComponent } from './doc-chapter.component';


@NgModule({
  declarations: [DocChapterComponent],
  imports: [
    CommonModule
  ],
  exports: [DocChapterComponent]
})
export class DocChapterModule { }
