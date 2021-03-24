import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectPageComponent} from './pages/project-page/project-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProjectBoardPageComponent} from './pages/project-board-page/project-board-page.component';
import {BoardModule} from './components/board/board.module';
import {ProjectRoutingModule} from './project-routing.module';
import {ProjectBoardPageModule} from './pages/project-board-page/project-board-page.module';


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
