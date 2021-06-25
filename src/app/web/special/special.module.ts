import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialComponent } from './special.component';
import {FlexModule} from '@angular/flex-layout';



@NgModule({
  declarations: [SpecialComponent],
  imports: [
    CommonModule,
    FlexModule
  ],
  exports: [
    SpecialComponent
  ]
})
export class SpecialModule { }
