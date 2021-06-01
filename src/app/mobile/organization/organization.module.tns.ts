import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { OrganizationRoutingModule } from './organization-routing.module.tns';
import { OrganizationComponent } from './organization.component.tns';
import {ActionBarModule} from '../action-bar/action-bar.module.tns';
import {OrganizationModalModule} from './organization-modal/organization-modal.module.tns';

@NgModule({
  imports: [NativeScriptCommonModule, OrganizationRoutingModule, ActionBarModule, OrganizationModalModule],
  declarations: [OrganizationComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
  ]
})
export class OrganizationModule{}
