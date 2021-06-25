import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Project, ProjectMember, Task, TasksContainer} from 'src/app/shared/atlas/entity.service';
import {ProjectMembersService} from '../../services/project-members.service';
import {EMPTY, from, Observable, Subscription} from 'rxjs';
import {filter, switchMap, tap} from 'rxjs/operators';
import {ProjectService} from '../../services/project.service';
import {MatDialog} from '@angular/material/dialog';
import {TaskEditorPopupComponent} from '../task-editor-popup/task-editor-popup.component';

@Component({
  selector: 'app-task-box',
  templateUrl: './task-box.component.html',
  styleUrls: ['./task-box.component.scss']
})
export class TaskBoxComponent implements OnInit, OnDestroy {

  @Input() task: Task;
  @Input() container: TasksContainer;
  assignTo: ProjectMember;
  $assignTo = Subscription.EMPTY;
  project$: Observable<Project> = EMPTY;

  project: Project;

  constructor(private pms: ProjectMembersService,
              private projectService: ProjectService,
              private dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this.$assignTo.unsubscribe();
  }

  ngOnInit(): void {

    this.project$ = this.projectService.project$.pipe(tap(p => this.project = p));

    this.$assignTo = this.pms.members$.pipe(
      switchMap(ms => {
          return from(ms).pipe(
            filter((m) => {
              return m.user.sub === this.task.assignToId;
            })
          );
        }
      )
    ).subscribe((member) => {
      this.assignTo = member;
    });
  }

  taskEditorPopup(): void {
    this.dialog.open(TaskEditorPopupComponent, {
      data: {
        task: this.task,
        project: this.project,
        assignTo: this.assignTo,
        container: this.container
      },
      width: '90%',
      height: '95%',
      maxWidth: '1024px',
      maxHeight: '95%'
    });
  }
}
