import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeToggleDirective} from './theme-toggle.directive';


@NgModule({
  declarations: [
    ThemeToggleDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ThemeToggleDirective,
  ]
})
export class DirectivesModule {
}
