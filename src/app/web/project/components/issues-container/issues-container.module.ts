import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesContainerComponent } from './issues-container.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../../../material.module';
import {IssueCreateModalModule} from '../../../../components/issue-create-modal/issue-create-modal.module';



@NgModule({
  declarations: [IssuesContainerComponent],
  imports: [
    CommonModule,
    DragDropModule,
    FlexLayoutModule,
    MaterialModule,
    IssueCreateModalModule
  ],
  exports: [IssuesContainerComponent]
})
export class IssuesContainerModule { }
