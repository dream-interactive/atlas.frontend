import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonToggleModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonToggleModule


  ]
})
export class MaterialModule {
}
