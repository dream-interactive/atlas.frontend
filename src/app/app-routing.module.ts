import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './pages/profile/profile.component';
import {AuthGuard} from './guards/auth.guard';
import {AboutComponent} from './pages/about/about.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
