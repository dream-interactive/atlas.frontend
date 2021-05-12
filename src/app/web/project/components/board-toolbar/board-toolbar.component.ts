import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {ProjectMembersService} from '../../services/project-members.service';
import {EMPTY, Observable} from 'rxjs';
import {ProjectMember} from '../../../../shared/atlas/entity.service';
import {ProjectService} from '../../services/project.service';
import {switchMap} from 'rxjs/operators';
import {TaskCreateModalComponent} from '../../../../components/task-create-modal/task-create-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-board-toolbar',
  templateUrl: './board-toolbar.component.html',
  styleUrls: ['./board-toolbar.component.scss']
})
export class BoardToolbarComponent implements OnInit {

  members$: Observable<ProjectMember[]> = EMPTY;
  member: ProjectMember;

  constructor(private taskService: TaskService,
              private projectService: ProjectService,
              private membersService: ProjectMembersService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.members$ = this.projectService.project$.pipe(
      switchMap((project) => {
        return this.membersService.findAllMembersByProjectId(project.idp);
      })
    );
  }

  createTask(): void {
    const modal = this.dialog.open(TaskCreateModalComponent, { data: { container: null }});

    modal.afterClosed().subscribe((value => {

    }));
  }
}
