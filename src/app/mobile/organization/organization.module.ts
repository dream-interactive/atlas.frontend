import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import {ActionBarModule} from '@src/app/mobile/action-bar/action-bar.module';
import {OrganizationModalModule} from '@src/app/components/organization-modal/organization-modal.module.tns';

@NgModule({
  imports: [NativeScriptCommonModule, OrganizationRoutingModule, ActionBarModule, OrganizationModalModule],
  declarations: [OrganizationComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
  ]
})
export class OrganizationModule {}
