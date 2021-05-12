import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskContainerComponent } from './task-container.component';
import {TaskCreateModalModule} from '../../../../components/task-create-modal/task-create-modal.module';
import {MaterialModule} from '../../../../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';



@NgModule({
  declarations: [TaskContainerComponent],
  imports: [
    CommonModule,
    TaskCreateModalModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [TaskContainerComponent]
})
export class TaskContainerModule { }
