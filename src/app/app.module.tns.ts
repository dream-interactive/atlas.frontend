import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {NativeScriptFormsModule, NativeScriptHttpClientModule, NativeScriptModule} from '@nativescript/angular';

import { AppRoutingModule } from '@src/app/app-routing.module.tns';
import { AppComponent } from '@src/app/app.component.tns';
import {NativeScriptUISideDrawerModule} from 'nativescript-ui-sidedrawer/angular';



// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
// import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    NativeScriptHttpClientModule,
    NativeScriptFormsModule,
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptUISideDrawerModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
