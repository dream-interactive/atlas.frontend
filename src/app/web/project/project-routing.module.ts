import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../guards/auth.guard';
import {NgModule} from '@angular/core';
import {ProjectPageComponent} from './pages/project-page/project-page.component';

const routes: Routes = [

  {
    path: 'o/:organization/:project/:key',
    component: ProjectPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'board'
      },
      {
        path: 'board',
        loadChildren: () => import('./pages/project-board-page/project-board-page.module')
          .then(module => module.ProjectBoardPageModule),
        canActivate: [AuthGuard]
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
