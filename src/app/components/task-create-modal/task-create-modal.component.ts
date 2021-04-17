import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from '../../web/project/services/project.service';
import {FormControl, FormGroup} from '@angular/forms';
import {TaskPriorities, TasksContainer} from '../../shared/atlas/entity.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TaskContainerService} from '../../web/project/services/task-container.service';
import {EMPTY, Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Editor} from 'ngx-editor';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

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
  containers: Observable<TasksContainer[]> = EMPTY;
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
  json: '';

  selectable = true;
  removable = true;

  labels: string [] = [];
  allLabels: string [] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  $project = Subscription.EMPTY;

  @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private projectService: ProjectService,
              private taskContainerService: TaskContainerService,
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
      this.containerControl.patchValue(containerFromData.idic);
    }

    this.filteredLabels = this.labelsControl.valueChanges.pipe(
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allLabels.slice()));
  }

  ngOnInit(): void {
    this.containers = this.taskContainerService.taskContainers$.pipe(
      startWith([]),
      map(containers => containers.sort((a: TasksContainer, b: TasksContainer) => a.indexNumber - b.indexNumber))
    );

    this.$project = this.projectService.project$.subscribe(project => {
      this.allLabels = project.labels;
    });



    this.editor = new Editor();

  }

  create(): void {
    console.log(this.descriptionControl.value);
  }

  remove(label: string): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.$project.unsubscribe();
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
