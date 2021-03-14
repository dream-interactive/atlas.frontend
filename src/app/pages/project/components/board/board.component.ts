import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Container} from '@angular/compiler/src/i18n/i18n_ast';

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
    {
      name: 'Done',
      issues: []
    }
  ];
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }
  dropContainer(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.containers, event.previousIndex, event.currentIndex);
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

  saveContainerName(value: string, container: Container, inputId: string): void {
    this.renderer.selectRootElement('#' + inputId).disabled = true;
    // TODO
  }


  editName(inputId: string): void {
    const input = this.renderer.selectRootElement('#' + inputId);

    input.disabled = false;

    setTimeout(() => {
      input.focus();
    }, 0);

  }

  disableInput(inputId: string): void{
    this.renderer.selectRootElement('#' + inputId).disabled = true;
  }
}
