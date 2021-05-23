import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {ProjectMembersService} from '../../services/project-members.service';
import {EMPTY, Observable, of, Subscription} from 'rxjs';
import {Project, ProjectMember, TasksContainer} from '../../../../shared/atlas/entity.service';
import {ProjectService} from '../../services/project.service';
import {switchMap} from 'rxjs/operators';
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
  member: ProjectMember;

  form: FormGroup;
  memberControl: FormControl = new FormControl(null);
  searchControl: FormControl = new FormControl('');

  private containers: TasksContainer[] = [];
  private project: Project = undefined;

  private $containers: Subscription = Subscription.EMPTY;
  private $project: Subscription = Subscription.EMPTY;

  constructor(private taskService: TaskService,
              private tcs: TaskContainerService,
              private projectService: ProjectService,
              private membersService: ProjectMembersService,
              private dialog: MatDialog) {
    this.form = new FormGroup({
      memberControl: this.memberControl,
      searchControl: this.searchControl,
    });
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      switchMap((value) => {
        if (value.length > 2) {
          this.taskFilter();
        }
        return of(value);
      })
    ).subscribe((value) => {});
  }

  ngAfterViewInit(): void {
    this.members$ = this.projectService.project$.pipe(
      switchMap((project) => {
        return this.membersService.findAllMembersByProjectId(project.idp);
      })
    );

    this.$containers = this.tcs.tasksContainers$.subscribe(containers => {
      this.containers = containers;
    });



    this.$project = this.projectService.project$.subscribe(project => {
      this.project = project;
    });
  }

  ngOnDestroy(): void {
    this.$containers.unsubscribe();
  }

  createTask(): void {
    const modal = this.dialog.open(TaskCreateModalComponent, { data: { container: null }});
    modal.afterClosed().subscribe((value => {

    }));
  }

  taskFilter(): void {
    this.tcs.taskFilter(
      this.searchControl.value as string,
      this.member,
      '',
      this.project);
  }
}
