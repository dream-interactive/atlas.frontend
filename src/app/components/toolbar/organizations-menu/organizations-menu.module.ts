import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsMenuComponent } from './organizations-menu.component';
import {MaterialModule} from '../../../material.module';
import {FlexModule} from '@angular/flex-layout';



@NgModule({
  declarations: [OrganizationsMenuComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule
    ],
  exports: [
    OrganizationsMenuComponent
  ]
})
export class OrganizationsMenuModule { }
