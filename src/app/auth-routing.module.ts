import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OKTA_CONFIG, OktaAuthModule, OktaCallbackComponent} from '@okta/okta-angular';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './shared/okta/auth.interceptor';

const oktaConfig = {
  issuer: 'https://dev-786355.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/callback',
  clientId: '0oa1ium5l7RlObiG74x7',
  pkce: true,
  scope: ['openid', 'email', 'profile', 'groups']
};

const routes: Routes = [
  {
    path: 'callback',
    component: OktaCallbackComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    OktaAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AuthRoutingModule { }
