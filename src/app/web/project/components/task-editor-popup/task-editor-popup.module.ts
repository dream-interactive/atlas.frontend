import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskEditorPopupComponent } from './task-editor-popup.component';
import {TaskEditorModule} from '../../../../components/task-editor/task-editor.module';
import {MaterialModule} from '../../../../material.module';
import {FlexModule} from '@angular/flex-layout';



@NgModule({
  declarations: [TaskEditorPopupComponent],
  imports: [
    CommonModule,
    TaskEditorModule,
    MaterialModule,
    FlexModule
  ],
  exports: [
    TaskEditorPopupComponent
  ]
})
export class TaskEditorPopupModule { }
