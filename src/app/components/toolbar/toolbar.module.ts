import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import {MaterialModule} from '../../material.module';
import {RouterModule} from '@angular/router';
import {AppModule} from '../../app.module';
import {DarkDirective} from './dark.directive';


@NgModule({
  declarations: [
    ToolbarComponent,
    DarkDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule {
}
