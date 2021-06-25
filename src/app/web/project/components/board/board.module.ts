import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardComponent} from './board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../../../material.module';
import {TaskContainerModule} from '../task-container/task-container.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    DragDropModule,
    FlexLayoutModule,
    MaterialModule,
    TaskContainerModule,
    FormsModule,
  ],
  exports: [
    BoardComponent
  ]
})
export class BoardModule { }
