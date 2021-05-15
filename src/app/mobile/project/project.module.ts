import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { ProjectRoutingModule } from './project-routing.module'
import { ProjectComponent } from './project.component'

@NgModule({
  imports: [NativeScriptCommonModule, ProjectRoutingModule],
  declarations: [ProjectComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProjectModule {}
