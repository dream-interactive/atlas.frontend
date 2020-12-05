import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {ToolbarModule} from './components/toolbar/toolbar.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ProfileModule} from './pages/profile/profile.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FooterModule} from './components/footer/footer.module';
import {AboutModule} from './pages/about/about.module';
import {StartModule} from './pages/start/start.module';
import {OrganizationModule} from './pages/organization/organization.module';
import {AuthRoutingModule} from './auth-routing.module';
import {OKTA_CONFIG} from '@okta/okta-angular';
import {AuthInterceptor} from './shared/okta/auth.interceptor';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

const oktaConfig = {
  issuer: 'https://dev-786355.okta.com/oauth2/default',
  redirectUri: '/callback',
  clientId: '0oa1ium5l7RlObiG74x7',
  scopes: ['openid', 'profile']
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ToolbarModule,
    AboutModule,
    ProfileModule,
    FooterModule,
    StartModule,
    OrganizationModule,
    AuthRoutingModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
