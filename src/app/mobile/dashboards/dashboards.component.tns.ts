import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application } from '@nativescript/core';
import {SelectedIndexChangedEventData} from 'nativescript-drop-down';
import {Project, TasksContainer} from '@src/app/shared/atlas/entity.service';
import {ProjectService} from '@src/app/web/project/services/project.service';
import {EMPTY, Observable, Subscription} from 'rxjs';
import {TaskContainerService} from '@src/app/web/project/services/task-container.service';
import {TaskService} from '@src/app/web/project/services/task.service';
import {ProjectMembersService} from '@src/app/web/project/services/project-members.service';
import {mergeMap} from 'rxjs/operators';

@Component({
  moduleId: module.id,
  selector: 'app-dashboards-tns',
  templateUrl: './dashboards.component.tns.html',
  styleUrls: ['./dashboards.component.tns.scss']
})
export class DashboardsComponent implements OnInit, OnDestroy {

  project: Project;
  projects: Project[] = [];
  projectName: string[];
  container: TasksContainer;
  containers: TasksContainer[] = [];




  $project = Subscription.EMPTY;
  $create = Subscription.EMPTY;
  $containers = Subscription.EMPTY;

  loading = true;
  private $projectsUser: Subscription = Subscription.EMPTY;
  constructor(
    private projectService: ProjectService,
    private taskContainerService: TaskContainerService,
    private taskService: TaskService,
    private membersService: ProjectMembersService,

  ) {
    this.$projectsUser = this.projectService.findAllByUserId('00u2v5jxvoGXWqQTw4x7').pipe(
    )
      .subscribe((projects) => {
        this.projects = projects;
        this.projectName = Array.from(projects, project => project.name);
        this.project = projects[1];
        this.loading = false;
        this.projectService.updateProjectsSubject(projects);

        this.$containers = this.taskContainerService.findAllByProjectId(
          this.project.idp).subscribe(
          (containers => {
            this.containers = containers;
            this.taskContainerService.updateContainers(containers); }
          ));

      }, error => this.loading = false);

  }
  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.$containers.unsubscribe();
    this.$create.unsubscribe();
    this.$project.unsubscribe();
  }

  /*onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }*/



  onchange(args: SelectedIndexChangedEventData): void {
    this.project = this.projects.find(pj => pj.name === this.projectName[args.newIndex]);
    this.$containers = this.taskContainerService.findAllByProjectId(
      this.project.idp).subscribe(
      (containers => {
          this.containers = containers;
          this.taskContainerService.updateContainers(containers); }
      ));

  }

  onItemTap($event: any): void {

   }


}
