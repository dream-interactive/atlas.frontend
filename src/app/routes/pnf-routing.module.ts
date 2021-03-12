import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '../pages/page-not-found/page-not-found.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  // should be last
  {path: '**', component: PageNotFoundComponent},  // Wildcard route for a 404 page

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class PageNotFoundRoutingModule {
}
