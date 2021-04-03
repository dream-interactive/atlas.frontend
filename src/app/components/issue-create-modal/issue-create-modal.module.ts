import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IssueCreateModalComponent} from './issue-create-modal.component';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxEditorModule} from 'ngx-editor';


@NgModule({
  declarations: [IssueCreateModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxEditorModule,
    FormsModule
  ],
  exports: [IssueCreateModalComponent]
})
export class IssueCreateModalModule {
}
