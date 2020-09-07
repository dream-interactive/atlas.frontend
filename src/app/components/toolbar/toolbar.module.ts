import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import {MaterialModule} from '../../material.module';
import {RouterModule} from '@angular/router';
import {AppModule} from '../../app.module';


@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    AppModule,
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule {
}
