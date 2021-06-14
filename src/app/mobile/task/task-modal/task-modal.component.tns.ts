import { Component, OnInit } from '@angular/core';
import {ModalDialogParams} from '@nativescript/angular';
import {OrganizationModalComponent} from '@src/app/mobile/organization/organization-modal/organization-modal.component';
import {ProjectService} from '@src/app/web/project/services/project.service';
import {TaskContainerService} from '@src/app/web/project/services/task-container.service';
import {TaskService} from '@src/app/web/project/services/task.service';
import {ProjectMembersService} from '@src/app/web/project/services/project-members.service';
import {TaskPriorities, TasksContainer} from '@src/app/shared/atlas/entity.service';
import {EMPTY, Observable} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.tns.html',
  styleUrls: ['./task-modal.component.tns.scss']
})
export class TaskModalComponent implements OnInit {


  container: TasksContainer;
  containers: TasksContainer[] = [];
  containers$: Observable<TasksContainer[]> = EMPTY;
  filteredLabels: Observable<string[]> = EMPTY;

  summaryControl: '';
  containerControl: '';
  assignToControl: '';
  priorityControl: '';
  descriptionControl: '';
  pointsControl: '';
  labelsControl: '';
  priorities = TaskPriorities;

  constructor(private projectService: ProjectService,
              private taskContainerService: TaskContainerService,
              private taskService: TaskService,
              private membersService: ProjectMembersService,
              private modalParams: ModalDialogParams
  ) { }

  ngOnInit(): void {
  }


  create(): void {

  }

}
/*
summaryControl = new FormControl('');
containerControl = new FormControl('');
assignToControl  = new FormControl('');
priorityControl = new FormControl('Medium');
descriptionControl = new FormControl(null);
pointsControl = new FormControl('');
labelsControl = new FormControl('');
priorities = TaskPriorities;*/
