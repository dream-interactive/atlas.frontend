import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material.module';
import {FlexModule} from '@angular/flex-layout';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AboutPageComponent} from './pages/about/about-page.component';
import {RouterModule} from '@angular/router';
import {HttpLoaderFactory} from '../../app.module';
import {HttpClient} from '@angular/common/http';


@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild([
      {
        path: '',
        component: AboutPageComponent
      }
    ])
  ]
})
export class AboutModule { }
