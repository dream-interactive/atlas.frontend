import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {NativeScriptCommonModule, NativeScriptFormsModule} from '@nativescript/angular';
import {OrganizationModalComponent} from './organization-modal.component.tns';
import {FormsModule} from '@angular/forms';


@NgModule({
    imports: [NativeScriptCommonModule, NativeScriptFormsModule],
  declarations: [OrganizationModalComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    OrganizationModalComponent
  ]
})
export class OrganizationModalModule {}
