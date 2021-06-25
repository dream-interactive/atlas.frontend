import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExceptionsPageComponent} from './exceptions-page.component';
import {HIGHLIGHT_OPTIONS, HighlightModule} from 'ngx-highlightjs';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../../../../material.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [ExceptionsPageComponent],
  imports: [
    CommonModule,
    HighlightModule,
    FlexModule,
    MaterialModule,

    RouterModule.forChild([
      {
        path: 'exceptions',
        component: ExceptionsPageComponent,
      }
    ])
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
export class ExceptionsPageModule { }
