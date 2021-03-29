import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardComponent} from './board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../../../material.module';
import {FormsModule} from '@angular/forms';
import {IssuesContainerModule} from '../issues-container/issues-container.module';


@NgModule({
  declarations: [BoardComponent],
    imports: [
        CommonModule,
        DragDropModule,
        FlexLayoutModule,
        MaterialModule,
        FormsModule,
        IssuesContainerModule,
    ],
  exports: [
    BoardComponent
  ]
})
export class BoardModule { }
