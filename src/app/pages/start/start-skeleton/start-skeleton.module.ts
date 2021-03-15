import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartSkeletonComponent } from './start-skeleton.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {MaterialModule} from '../../../material.module';



@NgModule({
  declarations: [StartSkeletonComponent],
  imports: [
    CommonModule,
    FlexModule,
    TranslateModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    StartSkeletonComponent
  ]
})
export class StartSkeletonModule { }
