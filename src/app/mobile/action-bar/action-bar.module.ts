import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import {ActionBarComponent} from '@src/app/mobile/action-bar/action-bar.component';



@NgModule({
  imports: [NativeScriptCommonModule],
  declarations: [ActionBarComponent],
  exports: [ActionBarComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ActionBarModule {}
