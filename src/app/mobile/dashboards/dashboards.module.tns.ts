import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { DashboardsRoutingModule } from './dashboards-routing.module.tns';
import { DashboardsComponent } from './dashboards.component.tns';
import {ActionBarModule} from '@src/app/mobile/action-bar/action-bar.module.tns';
import {CardTaskComponent} from '@src/app/mobile/dashboards/card-task/card-task.component';
import {DropDownModule} from 'nativescript-drop-down/angular';

@NgModule({
    imports: [NativeScriptCommonModule, DashboardsRoutingModule, ActionBarModule, DropDownModule],
  declarations: [DashboardsComponent, CardTaskComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DashboardsModule {}
