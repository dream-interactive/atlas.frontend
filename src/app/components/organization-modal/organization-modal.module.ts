import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationModalComponent } from './organization-modal.component';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [OrganizationModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule,
    FlexModule,
    FormsModule
  ],
  exports: [
    OrganizationModalComponent
  ]
})
export class OrganizationModalModule { }
