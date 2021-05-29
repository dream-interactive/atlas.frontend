import {NativeScriptHttpClientModule, NativeScriptRouterModule} from '@nativescript/angular';
import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {OKTA_CONFIG, OktaAuthModule} from '@okta/okta-angular';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '@src/app/shared/okta/auth.interceptor.tns';

/*

const oktaConfig = {
  issuer: 'https://dev-786355.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/callback',
  clientId: '0oa1ium5l7RlObiG74x7',
  pkce: true,
  scope: ['openid', 'email', 'profile', 'groups']
};
*/

const routes: Routes = [
  {path: '', redirectTo: '/organization', pathMatch: 'full'},
  {path: 'welcome',
  loadChildren: () => import('./mobile/welcome/welcome.module').then((m) => m.WelcomeModule)
  },
  {
    path: 'organization',
    loadChildren: () => import('./mobile/organization/organization.module').then((m) => m.OrganizationModule),
  },
  {
    path: 'organization',
    loadChildren: () => import('./mobile/organization/organization.module').then((m) => m.OrganizationModule),
  },
  {
    path: 'dashboards',
    loadChildren: () => import('./mobile/dashboards/dashboards.module').then((m) => m.DashboardsModule),
  },
  {
    path: 'task',
    loadChildren: () => import('./mobile/task/task.module').then((m) => m.TaskModule),
  },
  {
    path: 'project',
    loadChildren: () => import('./mobile/project/project.module').then((m) => m.ProjectModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./mobile/settings/settings.module').then((m) => m.SettingsModule),
  },
];

@NgModule({
  imports: [
    NativeScriptHttpClientModule,
 //   OktaAuthModule,
    NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppRoutingModule {}
