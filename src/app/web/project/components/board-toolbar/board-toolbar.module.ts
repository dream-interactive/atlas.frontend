import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BoardToolbarComponent } from './board-toolbar.component';
import {MaterialModule} from '../../../../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {AddMemberModalModule} from '../../../../components/add-member-modal/add-member-modal.module';


@NgModule({
  declarations: [BoardToolbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AddMemberModalModule
  ],
  exports: [
    BoardToolbarComponent
  ]
})
export class BoardToolbarModule { }
