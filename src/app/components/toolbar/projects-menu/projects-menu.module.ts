import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsMenuComponent} from './projects-menu.component';
import {MaterialModule} from '../../../material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [ProjectsMenuComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateModule,
        FlexModule
    ],
  exports: [
    ProjectsMenuComponent
  ]
})
export class ProjectsMenuModule {
}
