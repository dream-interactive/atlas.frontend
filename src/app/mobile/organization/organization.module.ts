import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';

@NgModule({
  imports: [NativeScriptCommonModule, OrganizationRoutingModule],
  declarations: [OrganizationComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class OrganizationModule {}
