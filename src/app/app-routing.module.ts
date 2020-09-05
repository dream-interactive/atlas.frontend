import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthGuard} from './auth.guard';
import {ExampleModule} from './components/example/example.module';

const routes: Routes = [
  { path: '', component: ExampleModule, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
