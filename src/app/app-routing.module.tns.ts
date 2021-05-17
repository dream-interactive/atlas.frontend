import {NativeScriptRouterModule} from '@nativescript/angular';
import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';

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
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
