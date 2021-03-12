import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgCardComponent } from './org-card.component';
import {MaterialModule} from '../../../../material.module';



@NgModule({
  declarations: [OrgCardComponent],
  exports: [
    OrgCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class OrgCardModule { }
