import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthGuard} from '../../guards/auth.guard';
import {DocumentationPageComponent} from './pages/documentaion-page/documentation-page.component';
import {RouterModule} from '@angular/router';
import {AdminGuard} from '../../guards/admin.guard';

const routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DocumentationPageComponent,

    children: [
      {
        path: 'exceptions',
        loadChildren: () => import('./pages/exceptions-page/exceptions-page.module').then(module => module.ExceptionsPageModule),
        canLoad: [AdminGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DocumentationRoutingModule { }
