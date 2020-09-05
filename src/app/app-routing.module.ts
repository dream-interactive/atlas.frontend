import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {ExampleModule} from './components/example/example.module';
import {ExampleComponent} from './components/example/example.component';

const routes: Routes = [
  {path: '', component: ExampleComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
