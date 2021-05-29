import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BoardToolbarComponent } from './board-toolbar.component';
import {MaterialModule} from '../../../../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [BoardToolbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    BoardToolbarComponent
  ]
})
export class BoardToolbarModule { }
