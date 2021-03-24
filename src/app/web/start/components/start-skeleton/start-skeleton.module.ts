import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StartSkeletonComponent} from './start-skeleton.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {MaterialModule} from '../../../../material.module';


@NgModule({
  declarations: [StartSkeletonComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    StartSkeletonComponent
  ]
})
export class StartSkeletonModule { }
