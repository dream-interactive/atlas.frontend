import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import {MaterialModule} from '../../material.module';
import {RouterModule} from '@angular/router';
import {DirectivesModule} from '../../directives/directives.module';
import {ThemePickerModule} from './theme-picker/theme-picker.module';
import {UserMenuModule} from './user-menu/user-menu.module';


@NgModule({
  declarations: [
    ToolbarComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    DirectivesModule,
    ThemePickerModule,
    UserMenuModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule {
}
