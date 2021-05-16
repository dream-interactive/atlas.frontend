import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WelcomeComponent } from '@src/app/mobile/welcome/welcome.component';
import {NativeScriptRouterModule} from '@nativescript/angular';

const routes: Routes = [
    { path: '', component: WelcomeComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class WelcomeRoutingModule { }
