import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptHttpClientModule} from '@nativescript/angular';

import { TaskRoutingModule } from './task-routing.module.tns';
import { TaskComponent } from './task.component.tns';
import {ActionBarModule} from '../action-bar/action-bar.module.tns';
import {TaskModalComponent} from '@src/app/mobile/task/task-modal/task-modal.component.tns';

@NgModule({
    imports: [NativeScriptCommonModule,
      TaskRoutingModule,
      ActionBarModule,
      NativeScriptFormsModule,
      NativeScriptHttpClientModule
    ],
  declarations: [TaskComponent, TaskModalComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class TaskModule {}
