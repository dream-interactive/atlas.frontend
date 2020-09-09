import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './user-menu.component';
import {MaterialModule} from '../../../material.module';
import {ThemePickerModule} from '../theme-picker/theme-picker.module';



@NgModule({
  declarations: [UserMenuComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ThemePickerModule
  ],
  exports: [
    UserMenuComponent
  ]
})
export class UserMenuModule { }
