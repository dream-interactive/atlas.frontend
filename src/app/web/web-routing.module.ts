import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {StartPageComponent} from './start/pages/start-page/start-page.component';
import {HomeComponent} from './home/home.component';

const routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'start',
    component: StartPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(module => module.AboutModule)
  },
  {
    path: 'docs',
    loadChildren: () => import('./documentation/documentation.module').then(module => module.DocumentationModule),
  },
  {
    path: 'special',
    loadChildren: () => import('./special/special.module').then(module => module.SpecialModule),
  },
  {
    path: 'o/:organization/:project/:key',
    loadChildren: () => import('./project/project.module').then(module => module.ProjectModule),
    canActivate: [AuthGuard],
  },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WebRoutingModule { }
