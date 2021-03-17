import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StartComponent} from './start.component';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material.module';
import {OrganizationModalModule} from '../../components/organization-modal/organization-modal.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {OrgCardModule} from './components/org-card/org-card.module';
import {ProjectModule} from '../project/project.module';
import {ProjectCardModule} from './components/project-card/project-card.module';
import {StartSkeletonModule} from './components/start-skeleton/start-skeleton.module';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../../guards/auth.guard';
import {HttpClient} from '@angular/common/http';
import {HttpLoaderFactory} from '../../app.module';
import {ProjectModalModule} from '../../components/project-modal/project-modal.module';


@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    FlexModule,
    MaterialModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    OrgCardModule,
    ProjectCardModule,
    StartSkeletonModule,

    RouterModule.forChild([
      {
        path: 'start',
        component: StartComponent,
        canActivate: [AuthGuard]
      },
    ])
  ]
})
export class StartModule {
}
