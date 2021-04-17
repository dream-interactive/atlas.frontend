import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskCreateModalComponent} from './task-create-modal.component';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxEditorModule} from 'ngx-editor';


@NgModule({
  declarations: [TaskCreateModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxEditorModule,
    FormsModule
  ],
  exports: [TaskCreateModalComponent]
})
export class TaskCreateModalModule {
}
