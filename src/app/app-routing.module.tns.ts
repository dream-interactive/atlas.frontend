import {NativeScriptHttpClientModule, NativeScriptRouterModule} from '@nativescript/angular';
import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '@src/app/shared/okta/auth.interceptor.tns';



const routes: Routes = [
  {path: '', redirectTo: '/organization', pathMatch: 'full'},
  {
    path: 'organization',
    loadChildren: () => import('./mobile/organization/organization.module.tns').then((m) => m.OrganizationModule),
  },

  {
    path: 'dashboards',
    loadChildren: () => import('./mobile/dashboards/dashboards.module.tns').then((m) => m.DashboardsModule),
  },
  {
    path: 'task',
    loadChildren: () => import('./mobile/task/task.module.tns').then((m) => m.TaskModule),
  },
  {
    path: 'project',
    loadChildren: () => import('./mobile/project/project.module.tns').then((m) => m.ProjectModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./mobile/settings/settings.module.tns').then((m) => m.SettingsModule),
  },
];

@NgModule({
  imports: [
    NativeScriptHttpClientModule,
    NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppRoutingModule {}
