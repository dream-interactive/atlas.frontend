import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import {OrganizationModalComponent} from './organization-modal.component.tns';


@NgModule({
  imports: [NativeScriptCommonModule],
  declarations: [OrganizationModalComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    OrganizationModalComponent
  ]
})
export class OrganizationModalModule {}
