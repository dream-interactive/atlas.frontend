import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { OrganizationComponent } from './organization.component';

const routes: Routes = [{ path: '', component: OrganizationComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class OrganizationRoutingModule {}
