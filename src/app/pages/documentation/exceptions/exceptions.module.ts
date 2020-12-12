import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExceptionsComponent } from './exceptions.component';
import {MaterialModule} from '../../../material.module';



@NgModule({
  declarations: [ExceptionsComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ExceptionsComponent
  ]
})
export class ExceptionsModule { }
