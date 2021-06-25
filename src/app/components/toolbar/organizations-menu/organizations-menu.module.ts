import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsMenuComponent } from './organizations-menu.component';
import {MaterialModule} from '../../../material.module';
import {FlexModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {OrganizationModalModule} from '../../organization-modal/organization-modal.module';



@NgModule({
  declarations: [OrganizationsMenuComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        TranslateModule,
        OrganizationModalModule

    ],
  exports: [
    OrganizationsMenuComponent
  ]
})
export class OrganizationsMenuModule { }
