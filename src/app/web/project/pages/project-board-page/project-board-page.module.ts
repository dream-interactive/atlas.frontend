import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectBoardPageComponent} from './project-board-page.component';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../../../../guards/auth.guard';
import {BoardModule} from '../../components/board/board.module';


@NgModule({
  declarations: [ProjectBoardPageComponent],
  imports: [
    CommonModule,

    BoardModule,

    RouterModule.forChild([
      {
        path: '',
        component: ProjectBoardPageComponent
      }
    ])
  ]
})
export class ProjectBoardPageModule {
}
