import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import {ActionBarModule} from '@src/app/mobile/action-bar/action-bar.module';

@NgModule({
    imports: [NativeScriptCommonModule, ProjectRoutingModule, ActionBarModule],
  declarations: [ProjectComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProjectModule {}
