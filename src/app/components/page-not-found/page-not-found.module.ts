import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import {MaterialModule} from '../../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      // should be the last
      {path: '**', component: PageNotFoundComponent},  // Wildcard route for a 404 page
    ])
  ],
  exports: [
    PageNotFoundComponent
  ]
})
export class PageNotFoundModule { }
