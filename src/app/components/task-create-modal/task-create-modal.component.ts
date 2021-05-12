import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from '../../web/project/services/project.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Project, ProjectMember, Task, TaskPriorities, TasksContainer} from '../../shared/atlas/entity.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TaskContainerService} from '../../web/project/services/task-container.service';
import {EMPTY, Observable} from 'rxjs';
import {map, startWith, switchMap, tap} from 'rxjs/operators';
import {Editor, toHTML} from 'ngx-editor';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {ProjectMembersService} from '../../web/project/services/project-members.service';
import {OktaAuthService} from '@okta/okta-angular';
import {UserClaims} from '@okta/okta-auth-js/lib/types';
import {TaskService} from '../../web/project/services/task.service';

export interface TaskCreateDialogData {
  container: TasksContainer;
}

@Component({
  selector: 'app-task-create-modal',
  templateUrl: './task-create-modal.component.html',
  styleUrls: ['./task-create-modal.component.scss']
})
export class TaskCreateModalComponent implements OnInit, OnDestroy {

  container: TasksContainer;
  containers: TasksContainer[] = [];
  containers$: Observable<TasksContainer[]> = EMPTY;
  filteredLabels: Observable<string[]> = EMPTY;

  taskForm: FormGroup;
  summaryControl = new FormControl('');
  containerControl = new FormControl('');
  assignToControl  = new FormControl('');
  priorityControl = new FormControl(1);
  descriptionControl = new FormControl(null);
  pointsControl = new FormControl('');
  labelsControl = new FormControl('');
  priorities = TaskPriorities;

  editor: Editor;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  labels: string [] = [];
  allLabels: string [] = [];

  project: Project;
  member: ProjectMember;

  $members: Observable<ProjectMember[]> = EMPTY;

  @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  user: UserClaims;

  constructor(private projectService: ProjectService,
              private taskContainerService: TaskContainerService,
              private taskService: TaskService,
              private membersService: ProjectMembersService,
              private auth: OktaAuthService,
              @Inject(MAT_DIALOG_DATA) public data: TaskCreateDialogData) {
    this.taskForm = new FormGroup({
      summaryControl: this.summaryControl,
      containerControl: this.containerControl,
      priorityControl: this.priorityControl,
      pointsControl: this.pointsControl,
      assignToControl: this.assignToControl,
      descriptionControl: this.descriptionControl,
      labelsControl: this.labelsControl
    });

    const containerFromData = this.data.container;

    if (containerFromData) {
      this.container = containerFromData;
      this.containerControl.patchValue(containerFromData.idtc);
    }

    this.filteredLabels = this.labelsControl.valueChanges.pipe(
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allLabels.slice()));
  }

  ngOnInit(): void {

    this.auth.getUser().then((user) => {
      this.user = user;
    });

    this.containers$ = this.taskContainerService.tasksContainers$.pipe(
      startWith([]),
      tap(containers => this.containers = containers),
      map(containers => containers.sort((a: TasksContainer, b: TasksContainer) => a.indexNumber - b.indexNumber))
    );

    this.$members = this.projectService.project$.pipe(
        switchMap((project) => {
          this.project = project;
          this.allLabels = project.labels;
          return this.membersService.findAllMembersByProjectId(project.idp);
        })
    );

    this.editor = new Editor();

  }

  create(): void {
    if (this.taskForm.valid) {
      const task: Task = {
        closeAfterIssues: [],
        closeBeforeIssues: [],
        closeWithIssues: [],
        creatorId: this.user.sub,
        dateTimeS: new Date(Date.now()),
        description: toHTML(this.descriptionControl.value),
        idp: this.project.idp,
        idtc: this.container.idtc,
        indexNumber: this.container.tasks.length,
        keyNumber: 0,
        labels: this.labels,
        points: this.pointsControl.value,
        priority: this.priorityControl.value,
        summary: this.summaryControl.value
      };
      console.log(task);
      this.taskService.create(task).subscribe(t => {
        console.log('created', t);
      });
    }

  }

  remove(label: string): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.labels.push(event.option.viewValue);
    this.labelInput.nativeElement.value = '';
    this.labelsControl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLabels.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.labels.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.labelsControl.setValue(null);
  }
}
