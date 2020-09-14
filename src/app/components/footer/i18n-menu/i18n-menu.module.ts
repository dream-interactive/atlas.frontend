import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nMenuComponent } from './i18n-menu.component';
import {MaterialModule} from '../../../material.module';


@NgModule({
  declarations: [I18nMenuComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    I18nMenuComponent,
    MaterialModule
  ]
})
export class I18nMenuModule { }
