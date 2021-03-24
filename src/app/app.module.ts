import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {WebModule} from './web/web.module';
import {ToolbarModule} from './components/toolbar/toolbar.module';
import {FooterModule} from './components/footer/footer.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AuthRoutingModule} from './auth-routing.module';
import {PageNotFoundModule} from './components/page-not-found/page-not-found.module';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    HttpClientModule,
    ToolbarModule,
    FooterModule,

    RouterModule.forRoot([]), // First routing
    AuthRoutingModule, // Second
    WebModule, // Third



    PageNotFoundModule // LAST !

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
