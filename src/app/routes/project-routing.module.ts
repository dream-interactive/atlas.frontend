import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {ProjectComponent} from '../pages/project/project.component';
import {BoardComponent} from '../pages/project/components/board/board.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
