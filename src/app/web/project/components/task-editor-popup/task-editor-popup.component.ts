import {Component, Inject, OnInit} from '@angular/core';
import {Project, ProjectMember, Task, TasksContainer} from '../../../../shared/atlas/entity.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

type DialogData = {
  task: Task;
  project: Project;
  container: TasksContainer;
  assignTo: ProjectMember;
};

@Component({
  selector: 'app-task-editor-popup',
  templateUrl: './task-editor-popup.component.html',
  styleUrls: ['./task-editor-popup.component.scss']
})
export class TaskEditorPopupComponent implements OnInit {

  task: Task;
  project: Project;
  container: TasksContainer;
  assignTo: ProjectMember;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.task = this.data.task;
    this.project = this.data.project;
    this.container = this.data.container;
    this.assignTo = this.data.assignTo;
  }

  ngOnInit(): void {
  }

}
