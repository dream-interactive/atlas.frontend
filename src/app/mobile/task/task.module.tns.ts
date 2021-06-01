import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { TaskRoutingModule } from './task-routing.module.tns';
import { TaskComponent } from './task.component.tns';
import {ActionBarModule} from '../action-bar/action-bar.module.tns';

@NgModule({
    imports: [NativeScriptCommonModule, TaskRoutingModule, ActionBarModule],
  declarations: [TaskComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class TaskModule {}
