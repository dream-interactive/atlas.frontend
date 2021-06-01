import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { SettingsRoutingModule } from './settings-routing.module.tns';
import { SettingsComponent } from './settings.component.tns';
import {ActionBarModule} from '../action-bar/action-bar.module.tns';

@NgModule({
    imports: [NativeScriptCommonModule, SettingsRoutingModule,  ActionBarModule],
  declarations: [SettingsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SettingsModule {}
