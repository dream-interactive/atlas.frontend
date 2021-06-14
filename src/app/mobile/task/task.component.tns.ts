import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import {Application, ItemEventData} from '@nativescript/core';
import {OrganizationModalComponent} from '@src/app/mobile/organization/organization-modal/organization-modal.component';
import {ModalDialogService} from '@nativescript/angular';
import {TaskModalComponent} from '@src/app/mobile/task/task-modal/task-modal.component.tns';
import {Organization, Project, Task, TasksContainer} from '@src/app/shared/atlas/entity.service';
import {from, Observable, Subscription, zip} from 'rxjs';
import {TaskService} from '@src/app/web/project/services/task.service';
import {TaskContainerService} from '@src/app/web/project/services/task-container.service';
import {ProjectService} from '@src/app/web/project/services/project.service';
import {OrganizationService} from '@src/app/services/organization.service';
import {switchMap} from 'rxjs/operators';

@Component({
  moduleId: module.id,
  selector: 'app-task-ng',
  templateUrl: './task.component.tns.html',
})
export class TaskComponent implements OnInit, OnDestroy {



  tasks: Task[] = [];
  organizations: Organization[] = [];
  projects: Project[] = [];
  tasksContainer: TasksContainer[] = [];
  loading = true;


  user: {
    userId: '00u2v5jxvoGXWqQTw4x7'
  };
  private $usersTasks: Subscription = Subscription.EMPTY;

  constructor(
    private modalDialog: ModalDialogService,
    private  vcRef: ViewContainerRef,
    private taskService: TaskService,
    private taskContainerService: TaskContainerService,
    private projectService: ProjectService,
    private organizationService: OrganizationService){

    this.$usersTasks = this.taskService.findAllByAssignToId('00u2v5jxvoGXWqQTw4x7')

      .subscribe((tasks) => {
        this.tasks = tasks;
        this.loading = false;

      }, error => this.loading = false);

  }


  ngOnInit(): void {

    console.log(this.tasks);
    // Init your component properties here.
  }

  onItemTap(args: ItemEventData): void {
    console.log('Item with index: ' + args.index + ' tapped');
  }

  addTack(): void {

    console.log(this.tasks);
    this.modalDialog.showModal(TaskModalComponent,
      {
        viewContainerRef: this.vcRef});
  }

  ngOnDestroy(): void {
    this.$usersTasks.unsubscribe();
  }


}
