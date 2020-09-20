import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsComponent } from './organizations.component';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material.module';



@NgModule({
  declarations: [OrganizationsComponent],
  imports: [
    CommonModule,
    FlexModule,
    MaterialModule
  ],
  exports: [
    OrganizationsComponent
  ]
})
export class OrganizationsModule { }
