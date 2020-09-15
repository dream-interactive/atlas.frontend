import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import {MaterialModule} from '../../material.module';
import {FlexModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexModule,
    TranslateModule
  ],
  exports: [
    AboutComponent
  ]
})
export class AboutModule { }
