import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {WebModule} from './web/web.module';
import {ToolbarModule} from './components/toolbar/toolbar.module';
import {FooterModule} from './components/footer/footer.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OKTA_CONFIG, OktaAuthModule} from '@okta/okta-angular';
import {AuthInterceptor} from './shared/okta/auth.interceptor';
import {RouterModule} from '@angular/router';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
const oktaConfig = {
  issuer: 'https://dev-786355.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/callback',
  clientId: '0oa1ium5l7RlObiG74x7',
  pkce: true,
  scope: ['openid', 'email', 'profile', 'groups']
};

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
    OktaAuthModule,
    WebModule,

    RouterModule.forRoot([])
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
