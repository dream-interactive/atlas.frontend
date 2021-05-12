import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TasksContainer} from '../../../../shared/atlas/entity.service';
import {TaskContainerService} from '../../services/task-container.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss']
})
export class TaskContainerComponent implements OnInit, AfterViewInit {

  @Input() container: TasksContainer;
  @Input() i: number;

  @ViewChild('tcname') tcname: ElementRef;

  constructor(private tcs: TaskContainerService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.tcname.nativeElement.value = this.container.summary;
  }

  saveName(value: string): void {
    this.container.summary = value;
    this.tcs.update(this.container).subscribe();
  }
}
