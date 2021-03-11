import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MaterialModule} from '../../material.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    DragDropModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ProjectComponent
  ]
})
export class ProjectModule { }
