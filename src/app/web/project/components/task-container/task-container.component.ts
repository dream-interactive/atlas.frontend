import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Task, TasksContainer} from '../../../../shared/atlas/entity.service';
import {TaskContainerService} from '../../services/task-container.service';
import {MatDialog} from '@angular/material/dialog';
import {TaskCreateModalComponent} from '../../../../components/task-create-modal/task-create-modal.component';
import {EMPTY, Observable} from 'rxjs';
import {TaskService} from '../../services/task.service';
import {startWith} from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss']
})
export class TaskContainerComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() container: TasksContainer;
  @Input() i: number;

  @ViewChild('tcname') tcname: ElementRef;
  taskCreating$: Observable<boolean> = EMPTY;

  constructor(private tcs: TaskContainerService,
              private taskService: TaskService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.taskCreating$ = this.taskService.taskCreating$.pipe(startWith(false));
  }

  ngAfterViewInit(): void {
    this.tcname.nativeElement.value = this.container.name;
  }

  saveName(value: string): void {
    this.container.name = value;
    this.tcs.update(this.container).subscribe();
  }

  openTaskModalCreate(): void {
    const matDialogRef = this.dialog.open(TaskCreateModalComponent, {data: {container: this.container}});

    matDialogRef.afterClosed().subscribe((value) => {

    });

  }

  ngOnDestroy(): void {
  }

  drop(event: CdkDragDrop<Task[]>, container: TasksContainer): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      this.tcs.moveTask(event.container.data, container.idtc).subscribe(tc => {
        console.log('tc', tc);
      });
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const task = event.item.data as Task;
      this.tcs.transferTask(
        event.container.data,
        container.idtc,
        task.idtc,
        event.previousContainer.data
      ).subscribe(result => {
        console.log(result);
      });
    }

  }
}
