import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcComponent } from './exc.component';
import {HIGHLIGHT_OPTIONS, HighlightModule} from 'ngx-highlightjs';
import {AtlasDocModule} from '../../../components/doc/atlas-doc.module';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../../../material.module';

@NgModule({
  declarations: [ExcComponent],
  imports: [
    CommonModule,
    HighlightModule,
    AtlasDocModule,
    FlexModule,
    MaterialModule,
  ],
  exports: [
    ExcComponent
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    }
  ]
})
export class ExcModule { }
