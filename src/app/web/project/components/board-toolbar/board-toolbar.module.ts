import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BoardToolbarComponent } from './board-toolbar.component';
import {MaterialModule} from '../../../../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [BoardToolbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    BoardToolbarComponent
  ]
})
export class BoardToolbarModule { }
