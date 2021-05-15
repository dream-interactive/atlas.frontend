import {NgModule} from '@angular/core';
import {HomeTestComponent} from '@src/app/home-test/home-test.component';
import {NativeScriptCommonModule} from '@nativescript/angular';

@NgModule({
  declarations: [HomeTestComponent],
  imports: [NativeScriptCommonModule],
  exports: [HomeTestComponent],

})
export class HomeTestModule{}
