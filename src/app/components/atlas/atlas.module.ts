import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtlasComponent } from './atlas.component';



@NgModule({
  declarations: [AtlasComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AtlasComponent
  ]
})
export class AtlasModule { }
