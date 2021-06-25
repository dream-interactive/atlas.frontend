import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectCardComponent} from './project-card.component';
import {MaterialModule} from '../../../../material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [ProjectCardComponent],
  exports: [
    ProjectCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule
  ]
})
export class ProjectCardModule {
}
