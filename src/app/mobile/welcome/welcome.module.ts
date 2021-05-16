import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { WelcomeRoutingModule } from '@src/app/mobile/welcome/welcome-routing.module';
import { WelcomeComponent } from '@src/app/mobile/welcome/welcome.component';
import { WelcomeSlidesService } from '@src/app/mobile/welcome/welcome-slides.service';
import {NativeScriptCommonModule} from '@nativescript/angular';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        WelcomeRoutingModule,
    ],
    providers: [
        WelcomeSlidesService
    ],
    declarations: [
        WelcomeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class WelcomeModule { }
