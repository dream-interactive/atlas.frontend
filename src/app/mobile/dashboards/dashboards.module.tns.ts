import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { DashboardsRoutingModule } from './dashboards-routing.module.tns';
import { DashboardsComponent } from './dashboards.component.tns';
import {ActionBarModule} from '@src/app/mobile/action-bar/action-bar.module.tns';

@NgModule({
    imports: [NativeScriptCommonModule, DashboardsRoutingModule, ActionBarModule],
  declarations: [DashboardsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DashboardsModule {}
