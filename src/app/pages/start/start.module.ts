import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material.module';



@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    FlexModule,
    MaterialModule
  ],
  exports: [
    StartComponent
  ]
})
export class StartModule { }
