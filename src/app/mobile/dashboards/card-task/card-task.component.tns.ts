import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '@src/app/web/project/services/task.service';
import {TasksContainer} from '@src/app/shared/atlas/entity.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-card-task',
  templateUrl: './card-task.component.tns.html',
  styleUrls: ['./card-task.component.tns.scss']
})
export class CardTaskComponent implements OnInit, OnDestroy  {

  @Input() container: TasksContainer;


  $tasks = Subscription.EMPTY;

  constructor(
    private taskService: TaskService


  ) {


  }

  ngOnInit(): void {

  }
    ngOnDestroy(): void {
      this.$tasks.unsubscribe();
    }

}
