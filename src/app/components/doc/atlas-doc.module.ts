import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocTitleModule} from './doc-title/doc-title.module';
import {DocHeaderModule} from './doc-header/doc-header.module';
import {DocSmallDescriptionModule} from './doc-small-description/doc-small-description.module';
import { AtlasDocComponent } from './atlas-doc.component';
import {DocBodyModule} from './doc-body/doc-body.module';
import {DocChapterModule} from './doc-chapter/doc-chapter.module';



@NgModule({
  declarations: [AtlasDocComponent],
  imports: [
    CommonModule,
    DocTitleModule,
    DocHeaderModule,
    DocSmallDescriptionModule,
    DocBodyModule,
    DocChapterModule,
  ],
  exports: [
    AtlasDocComponent,

    DocTitleModule,
    DocHeaderModule,
    DocSmallDescriptionModule,
    DocBodyModule,
    DocChapterModule
  ]
})
export class AtlasDocModule { }
