import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material.module';
import {TranslateModule} from '@ngx-translate/core';
import {OrgCardModule} from './components/org-card/org-card.module';
import {ProjectCardModule} from './components/project-card/project-card.module';
import {StartSkeletonModule} from './components/start-skeleton/start-skeleton.module';
import {StartPageComponent} from './pages/start-page/start-page.component';


@NgModule({
  declarations: [StartPageComponent],
  imports: [
    CommonModule,
    FlexModule,
    MaterialModule,
    TranslateModule,

    OrgCardModule,
    ProjectCardModule,

    StartSkeletonModule,

  ]
})
export class StartModule {
}
