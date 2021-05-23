import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AtlasUser, Project, Task} from 'src/app/shared/atlas/entity.service';
import {ProjectMembersService} from '../../services/project-members.service';
import {EMPTY, from, Observable, Subscription} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-task-box',
  templateUrl: './task-box.component.html',
  styleUrls: ['./task-box.component.scss']
})
export class TaskBoxComponent implements OnInit, OnDestroy {

  @Input() task: Task;
  assignTo: AtlasUser;
  $assignTo = Subscription.EMPTY;
  project$: Observable<Project> = EMPTY;

  constructor(private pms: ProjectMembersService,
              private projectService: ProjectService) { }

  ngOnDestroy(): void {
        this.$assignTo.unsubscribe();
  }

  ngOnInit(): void {

    this.project$ = this.projectService.project$;

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
      this.assignTo = member.user;
    });
  }

}
