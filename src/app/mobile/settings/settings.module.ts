import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import {TranslateModule} from '@ngx-translate/core';
import {ActionBarModule} from '@src/app/mobile/action-bar/action-bar.module';

@NgModule({
    imports: [NativeScriptCommonModule, SettingsRoutingModule, TranslateModule, ActionBarModule],
  declarations: [SettingsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SettingsModule {}
