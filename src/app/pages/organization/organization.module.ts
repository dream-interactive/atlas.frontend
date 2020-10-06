import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization.component';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {CardOrganizationComponent} from './card-organization/card-organization.component';
import {CardOrganizationModule} from './card-organization/card-organization.module';



@NgModule({
  declarations: [OrganizationComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    FlexModule,
    CardOrganizationModule
  ]
})
export class OrganizationModule { }
