import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardsComponent } from './dashboards.component';

@NgModule({
  imports: [NativeScriptCommonModule, DashboardsRoutingModule],
  declarations: [DashboardsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DashboardsModule {}
