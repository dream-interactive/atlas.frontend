import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePickerComponent } from './theme-picker.component';
import {MaterialModule} from '../../../material.module';
import {DirectivesModule} from '../../../directives/directives.module';



@NgModule({
  declarations: [ThemePickerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DirectivesModule
  ],
  exports: [
    ThemePickerComponent
  ]
})
export class ThemePickerModule { }
