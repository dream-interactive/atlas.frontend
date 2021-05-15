import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from '@nativescript/angular';
import {WebRoutingModule} from '@src/app/web/web-routing.module';
import {HomeComponent} from '@src/app/web/home/home.component.tns';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    NativeScriptCommonModule,
  ],
  exports: [HomeComponent],
  schemas: [NO_ERRORS_SCHEMA]

})

export class HomeModule {}
