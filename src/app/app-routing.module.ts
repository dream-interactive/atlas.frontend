import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AtlasComponent} from './components/atlas/atlas.component';
import {ExampleComponent} from './components/example/example.component';

const routes: Routes = [
  {path: '', component: AtlasComponent},
  {path: 'example', component: ExampleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
