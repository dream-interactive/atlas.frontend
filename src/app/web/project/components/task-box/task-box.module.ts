import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskBoxComponent } from './task-box.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MaterialModule} from '../../../../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {TaskEditorPopupModule} from '../task-editor-popup/task-editor-popup.module';



@NgModule({
  declarations: [TaskBoxComponent],
  exports: [
    TaskBoxComponent
  ],
  imports: [
    DragDropModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    TaskEditorPopupModule
  ]
})
export class TaskBoxModule { }
