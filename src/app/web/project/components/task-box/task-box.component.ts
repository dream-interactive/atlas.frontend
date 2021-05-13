import {Component, Input, OnInit} from '@angular/core';
import {AtlasUser, ProjectMember, Task} from 'src/app/shared/atlas/entity.service';
import {ProjectMembersService} from '../../services/project-members.service';
import {from, Observable, of} from 'rxjs';
import {filter, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-task-box',
  templateUrl: './task-box.component.html',
  styleUrls: ['./task-box.component.scss']
})
export class TaskBoxComponent implements OnInit {

  @Input() task: Task;
  assignTo: AtlasUser = ;

  constructor(private pms: ProjectMembersService) { }

  ngOnInit(): void {
    this.assignToMember$ = this.pms.members$
      .pipe(
        switchMap(ms => {
          this.members = ms;
          return from(ms).pipe(
            startWith(),
            filter(m => m.user.sub === this.task.assignToId)
          );
        })
      );
  }

}
