import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {I18nMenuModule} from './i18n-menu/i18n-menu.module';


@NgModule({
  declarations: [FooterComponent],
  exports: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslateModule,
    FlexLayoutModule,
    I18nMenuModule,
  ]
})
export class FooterModule { }
