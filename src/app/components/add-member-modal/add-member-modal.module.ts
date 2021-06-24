import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMemberModalComponent } from './add-member-modal.component';
import {MaterialModule} from '../../material.module';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [AddMemberModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    AddMemberModalComponent
  ]
})
export class AddMemberModalModule { }
