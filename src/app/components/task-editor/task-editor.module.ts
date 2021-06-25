import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskEditorComponent } from './task-editor.component';
import {FormArray, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {NgxEditorModule} from 'ngx-editor';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';



@NgModule({
  declarations: [TaskEditorComponent],
  exports: [
    TaskEditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NgxEditorModule,
    FlexModule,
    FlexLayoutModule
  ]
})
export class TaskEditorModule { }
