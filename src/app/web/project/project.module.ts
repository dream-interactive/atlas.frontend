import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectPageComponent} from './pages/project-page/project-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProjectRoutingModule} from './project-routing.module';

@NgModule({
  declarations: [ProjectPageComponent],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,

    ProjectRoutingModule

  ]
})
export class ProjectModule {
}
