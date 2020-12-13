import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExceptionsComponent} from './exceptions.component';
import {MaterialModule} from '../../../material.module';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [ExceptionsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    BrowserModule,
    FlexModule
  ],
  exports: [
    ExceptionsComponent
  ]
})
export class ExceptionsModule {
}
