import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { ProjectRoutingModule } from './project-routing.module.tns';
import { ProjectComponent } from './project.component.tns';
import {ActionBarModule} from '../action-bar/action-bar.module.tns';

@NgModule({
    imports: [NativeScriptCommonModule, ProjectRoutingModule, ActionBarModule],
  declarations: [ProjectComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProjectModule {}
