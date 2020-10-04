import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material.module';
import {OrganizationModalModule} from '../../components/organization-modal/organization-modal.module';



@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    FlexModule,
    MaterialModule,
    OrganizationModalModule
  ],
  exports: [
    StartComponent
  ]
})
export class StartModule { }
