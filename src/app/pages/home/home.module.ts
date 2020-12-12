import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material.module';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FlexModule,
    MaterialModule,
    TranslateModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
