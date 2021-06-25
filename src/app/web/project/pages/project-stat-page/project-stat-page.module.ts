import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectStatPageComponent} from './project-stat-page.component';
import {RouterModule} from '@angular/router';
import {NgxEchartsModule} from 'ngx-echarts';


@NgModule({
  declarations: [ProjectStatPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectStatPageComponent
      }
    ]),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ]
})
export class ProjectStatPageModule { }
