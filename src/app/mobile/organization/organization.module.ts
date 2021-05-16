import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import {ActionBarComponent} from '@src/app/mobile/action-bar/action-bar.component';
import {ActionBarModule} from '@src/app/mobile/action-bar/action-bar.module';

@NgModule({
  imports: [NativeScriptCommonModule, OrganizationRoutingModule, ActionBarModule],
  declarations: [OrganizationComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
  ]
})
export class OrganizationModule {}
