import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {NativeScriptCommonModule, NativeScriptFormsModule} from '@nativescript/angular';

import { ProjectRoutingModule } from './project-routing.module.tns';
import { ProjectComponent } from './project.component.tns';
import {ActionBarModule} from '../action-bar/action-bar.module.tns';
import {ProjectModalComponent} from '@src/app/mobile/project/project-modal/project-modal.component';
import {DropDownModule} from 'nativescript-drop-down/angular';

@NgModule({
    imports: [NativeScriptCommonModule,
      ProjectRoutingModule,
      ActionBarModule,
      NativeScriptFormsModule,
      DropDownModule],
  declarations: [ProjectComponent, ProjectModalComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProjectModule {}
