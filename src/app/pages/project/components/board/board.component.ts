import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  containers = [
    {
      name: 'TODO',
      issues: ['sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf']
    },
    {
      name: 'In work',
      issues: ['dfew', 'fweas']
    },
    {
      name: 'In check',
      issues: []
    },
    {
      name: 'Done',
      issues: []
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }
  dropContainer(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.containers, event.previousIndex, event.currentIndex);
  }

  saveContainerName(): void {

  }

  dropIssue(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
