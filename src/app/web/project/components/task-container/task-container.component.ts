import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Task, TasksContainer} from '../../../../shared/atlas/entity.service';
import {TaskContainerService} from '../../services/task-container.service';
import {MatDialog} from '@angular/material/dialog';
import {TaskCreateModalComponent} from '../../../../components/task-create-modal/task-create-modal.component';
import {EMPTY, Observable, Subscription} from 'rxjs';
import {TaskService} from '../../../../shared/task.service';
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
  private $containers: Subscription;
  private containers: TasksContainer[] = [];

  constructor(private tcs: TaskContainerService,
              private taskService: TaskService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.taskCreating$ = this.taskService.taskCreating$.pipe(startWith(false));

    this.$containers = this.tcs.tasksContainers$.subscribe(cs => this.containers = cs);
  }

  ngAfterViewInit(): void {
    this.tcname.nativeElement.value = this.container.name;
  }

  ngOnDestroy(): void {
    this.$containers.unsubscribe();
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


  drop(event: CdkDragDrop<Task[]>, container: TasksContainer): void {
    if (event.previousContainer === event.container) {

      if (event.currentIndex !== event.previousIndex) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

        this.tcs.moveTask(event.container.data, container.idtc).subscribe(c => {
          const index = this.containers.findIndex(con => con.idtc === c.idtc);
          if (index >= 0) {
            this.containers[index] = c;
          }
          this.tcs.updateContainers(this.containers);
        });
      }
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
      ).subscribe(cs => {

        cs.forEach(c => {
          const index = this.containers.findIndex(con => con.idtc === c.idtc);
          if (index >= 0) {
            this.containers[index] = c;
          }
        });

        this.tcs.updateContainers(this.containers);
      });
    }

  }
}
