import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {ExceptionsComponent} from '../pages/documentation/exceptions/exceptions.component';
import {DocumentationComponent} from '../pages/documentation/documentation.component';
import {AdminGuard} from '../guards/admin.guard';

const routes: Routes = [

  {
    path: 'docs',
    component: DocumentationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'exceptions',
        component: ExceptionsComponent,
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
