import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from '../pages/profile/profile.component';
import {AuthGuard} from '../guards/auth.guard';
import {AboutComponent} from '../pages/about/about.component';
import {OrganizationComponent} from '../pages/organization/organization.component';
import {SpecialComponent} from '../pages/special/special.component';
import {PageNotFoundComponent} from '../pages/page-not-found/page-not-found.component';
import {ProjectComponent} from '../pages/project/project.component';
import {BoardComponent} from '../pages/project/components/board/board.component';

const routes: Routes = [

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
    path: 'o/:organization/:project/:key',
    component: ProjectComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full'
      },
      {
        path: 'board',
        component: BoardComponent,
        canActivate: [AuthGuard]
      }
    ]
  },




  // should be last
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
