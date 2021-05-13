import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskBoxComponent } from './task-box.component';
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [TaskBoxComponent],
  exports: [
    TaskBoxComponent
  ],
  imports: [
    DragDropModule,
    CommonModule
  ]
})
export class TaskBoxModule { }
