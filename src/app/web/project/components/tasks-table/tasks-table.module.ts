import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksTableComponent } from './tasks-table.component';
import {TaskEditorModule} from '../../../../components/task-editor/task-editor.module';



@NgModule({
  declarations: [TasksTableComponent],
  imports: [
    CommonModule,
    TaskEditorModule
  ],
  exports: [
    TasksTableComponent
  ]
})
export class TasksTableModule { }
