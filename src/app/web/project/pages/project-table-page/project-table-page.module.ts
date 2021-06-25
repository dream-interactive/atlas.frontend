import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectTablePageComponent} from './project-table-page.component';
import {RouterModule} from '@angular/router';
import {BoardToolbarModule} from '../../components/board-toolbar/board-toolbar.module';
import {TasksTableModule} from '../../components/tasks-table/tasks-table.module';


@NgModule({
  declarations: [ProjectTablePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectTablePageComponent
      }
    ]),
    BoardToolbarModule,
    TasksTableModule
  ],

})
export class ProjectTablePageModule { }
