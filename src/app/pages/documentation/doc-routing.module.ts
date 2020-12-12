import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../guards/auth.guard';
import {ExceptionsComponent} from './exceptions/exceptions.component';
import {DocumentationComponent} from './documentation.component';

const routes: Routes = [

  {
    path: 'documentation',
    component: DocumentationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'exceptions',
        component: ExceptionsComponent,
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
export class DocRoutingModule {
}
