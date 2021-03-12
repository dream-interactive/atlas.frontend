import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material.module';
import {OrganizationModalModule} from '../../components/organization-modal/organization-modal.module';
import {TranslateModule} from '@ngx-translate/core';
import {OrgCardModule} from './components/org-card/org-card.module';
import {ProjectModule} from '../project/project.module';
import {ProjectCardModule} from './components/project-card/project-card.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {StartSkeletonModule} from './start-skeleton/start-skeleton.module';



@NgModule({
  declarations: [StartComponent],
    imports: [
        CommonModule,
        FlexModule,
        MaterialModule,
        OrganizationModalModule,
        TranslateModule,
        OrgCardModule,
        ProjectModule,
        ProjectCardModule,
        MatProgressSpinnerModule,
        StartSkeletonModule
    ],
  exports: [
    StartComponent
  ]
})
export class StartModule { }
