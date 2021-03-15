import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectComponent} from './project.component';
import {MaterialModule} from '../../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {BoardModule} from './components/board/board.module';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    BoardModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports: [
    ProjectComponent
  ]
})
export class ProjectModule { }
