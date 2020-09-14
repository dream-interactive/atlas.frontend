import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AtlasComponent} from './pages/atlas/atlas.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AtlasComponent
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
