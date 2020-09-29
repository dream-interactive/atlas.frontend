import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsMenuComponent } from './organizations-menu.component';
import {MaterialModule} from '../../../material.module';
import {FlexModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [OrganizationsMenuComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        TranslateModule
    ],
  exports: [
    OrganizationsMenuComponent
  ]
})
export class OrganizationsMenuModule { }
