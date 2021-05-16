import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import {ActionBarModule} from '@src/app/mobile/action-bar/action-bar.module';

@NgModule({
    imports: [NativeScriptCommonModule, TaskRoutingModule, ActionBarModule],
  declarations: [TaskComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class TaskModule {}
