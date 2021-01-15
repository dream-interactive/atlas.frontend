import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {DocumentationComponent} from '../pages/documentation/documentation.component';
import {AdminGuard} from '../guards/admin.guard';
import {ExcComponent} from '../pages/documentation/exc/exc.component';

const routes: Routes = [

  {
    path: 'docs',
    component: DocumentationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'exceptions',
        component: ExcComponent,
        canActivate: [AdminGuard]
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
export class DocRoutingModule {
}
