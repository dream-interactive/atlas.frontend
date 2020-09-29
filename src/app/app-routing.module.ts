import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './pages/profile/profile.component';
import {AuthGuard} from './guards/auth.guard';
import {AboutComponent} from './pages/about/about.component';
import {StartComponent} from './pages/start/start.component';
import {OrganizationComponent} from './pages/organization/organization.component';
import {ProjectComponent} from './pages/project/project.component';
import {SpecialComponent} from './pages/special/special.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'start',
    component: StartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'special',
    component: SpecialComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'o/:organization',
    component: OrganizationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':organization/p/:project',
    component: ProjectComponent,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
