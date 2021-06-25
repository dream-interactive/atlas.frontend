import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Project, ProjectMember, Task, TaskPriorities, TasksContainer} from 'src/app/shared/atlas/entity.service';
import {TaskService} from '../../shared/task.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Editor} from 'ngx-editor';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {EMPTY, Observable} from 'rxjs';
import {map, startWith, timeout} from 'rxjs/operators';
import {ProjectService} from '../../web/project/services/project.service';
import {TaskContainerService} from '../../web/project/services/task-container.service';
import {ProjectMembersService} from '../../web/project/services/project-members.service';
import {OktaAuthService} from '@okta/okta-angular';
import {UserClaims} from '@okta/okta-auth-js/lib/types';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.scss']
})
export class TaskEditorComponent implements OnInit, OnDestroy {

  @Input() task: Task;
  @Input() project: Project;
  @Input() container: TasksContainer;
  @Input() assignTo: ProjectMember;

  editor: Editor = new Editor();

  form: FormGroup;
  summaryControl: FormControl = new FormControl({value: '', disabled: true}, Validators.required);
  containerControl = new FormControl({value: '', disabled: true});
  assignToControl  = new FormControl({value: '', disabled: true});
  priorityControl = new FormControl({value: '', disabled: true});
  descriptionControl = new FormControl({value: null, disabled: true});
  pointsControl = new FormControl({value: '', disabled: true});
  labelsControl = new FormControl({value: '', disabled: true});

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  containers: TasksContainer[] = [];
  containers$: Observable<TasksContainer[]> = EMPTY;
  members$: Observable<ProjectMember[]> = EMPTY;

  priorities = TaskPriorities;

  user: UserClaims;

  labels: string [] = [];
  allLabels: string [] = [];
  @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  filteredLabels: Observable<string[]> = EMPTY;

  editable = false;

  constructor(private taskService: TaskService,
              private projectService: ProjectService,
              private taskContainerService: TaskContainerService,
              private membersService: ProjectMembersService,
              private auth: OktaAuthService) {

    this.form = new FormGroup({
      summaryControl: this.summaryControl,
      containerControl: this.containerControl,
      priorityControl: this.priorityControl,
      pointsControl: this.pointsControl,
      assignToControl: this.assignToControl,
      descriptionControl: this.descriptionControl,
      labelsControl: this.labelsControl
    });

    this.filteredLabels = this.labelsControl.valueChanges.pipe(
      map((label: string | null) => label ? this._filter(label) : this.allLabels.slice()));
  }

  ngOnInit(): void {
    this.labels = this.task.labels;

    this.summaryControl.patchValue(this.task.summary);
    this.descriptionControl.patchValue(this.task.description);
    this.priorityControl.patchValue(this.task.priority);
    this.pointsControl.patchValue(this.task.points);
    this.labelsControl.patchValue(this.task.labels);
    this.assignToControl.patchValue(this.assignTo);
    this.containerControl.patchValue(this.container);

    this.auth.getUser().then((user) => {
      this.user = user;
    });

    this.containers$ = this.taskContainerService.tasksContainers$.pipe(
      startWith([])
    );

    this.members$ = this.membersService.members$.pipe(
      startWith([])
    );
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  remove(label: string): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
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

  edit(): void {
    this.editable = true;
    this.form.enable();
  }
}
