import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocSmallDescriptionComponent} from './doc-small-description.component';
import {DocHeaderComponent} from '../doc-header/doc-header.component';


@NgModule({
  declarations: [DocSmallDescriptionComponent],

  imports: [
    CommonModule
  ],
  exports: [DocSmallDescriptionComponent]
})
export class DocSmallDescriptionModule {
}
