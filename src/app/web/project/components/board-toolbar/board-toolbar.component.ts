import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {ProjectMembersService} from '../../services/project-members.service';
import {EMPTY, Observable, of, Subscription} from 'rxjs';
import {Project, ProjectMember, Task, TasksContainer} from '../../../../shared/atlas/entity.service';
import {ProjectService} from '../../services/project.service';
import {startWith, switchMap, tap} from 'rxjs/operators';
import {TaskCreateModalComponent} from '../../../../components/task-create-modal/task-create-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {TaskContainerService} from '../../services/task-container.service';

@Component({
  selector: 'app-board-toolbar',
  templateUrl: './board-toolbar.component.html',
  styleUrls: ['./board-toolbar.component.scss']
})
export class BoardToolbarComponent implements OnInit, AfterViewInit, OnDestroy {

  members$: Observable<ProjectMember[]> = EMPTY;
  project$: Observable<Project> = EMPTY;
  form: FormGroup;

  memberControl: FormControl = new FormControl(null);
  searchControl: FormControl = new FormControl('');
  labelControl: FormControl = new FormControl('');

  member: ProjectMember;
  private project: Project;
  private $searchController: Subscription;
  private $labelController: Subscription;
  private $memberController: Subscription;

  constructor(private taskService: TaskService,
              private tcs: TaskContainerService,
              private projectService: ProjectService,
              private membersService: ProjectMembersService,
              private dialog: MatDialog) {
    this.form = new FormGroup({
      memberControl: this.memberControl,
      searchControl: this.searchControl,
      labelControl: this.labelControl,
    });
  }

  ngOnInit(): void {

    this.$searchController = this.searchControl.valueChanges.pipe(
      switchMap((value) => {
        if (value.length > 2) {
          this.taskFilter(value, this.member, this.labelControl.value, this.project);
        }
        return of(value);
      })
    ).subscribe((value) => {
    });

    this.$labelController = this.labelControl.valueChanges.subscribe(value => {
      this.taskFilter(this.searchControl.value, this.member, value, this.project);
    });

    this.$memberController = this.memberControl.valueChanges.subscribe(value => {
      this.taskFilter(this.searchControl.value, value, this.labelControl.value, this.project);
    });

    this.members$ = this.projectService.project$.pipe(
      switchMap((project) => {
        if (project.idp) {
          return this.membersService.findAllMembersByProjectId(project.idp);
        } else {
          return EMPTY;
        }
      })
    );

    this.project$ = this.projectService.project$.pipe(
      tap((project) => this.project = project)
    );
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.$searchController.unsubscribe();
    this.$memberController.unsubscribe();
    this.$labelController.unsubscribe();
  }

  createTask(): void {
    const modal = this.dialog.open(TaskCreateModalComponent, {data: {container: null}});
    modal.afterClosed().subscribe((value => {

    }));
  }

  taskFilter(search: string, member: ProjectMember, label: string, project: Project): void {
    this.tcs.taskFilter(
      search,
      member,
      label,
      project
    );
  }
}
