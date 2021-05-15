import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { DashboardsComponent } from './dashboards.component';

const routes: Routes = [{ path: '', component: DashboardsComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class DashboardsRoutingModule {}
