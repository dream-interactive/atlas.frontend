import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsMenuComponent} from './projects-menu.component';
import {MaterialModule} from '../../../material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FlexModule} from '@angular/flex-layout';
import {ProjectModalModule} from '../../project-modal/project-modal.module';


@NgModule({
  declarations: [ProjectsMenuComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    FlexModule,
    ProjectModalModule
  ],
  exports: [
    ProjectsMenuComponent
  ]
})
export class ProjectsMenuModule {
}
