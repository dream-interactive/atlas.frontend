import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {IssuesContainer} from '../../../../shared/atlas/entity.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {IssueCreateModalComponent} from '../../../../components/issue-create-modal/issue-create-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-issues-container',
  templateUrl: './issues-container.component.html',
  styleUrls: ['./issues-container.component.scss']
})
export class IssuesContainerComponent implements OnInit {

  @Input() container: IssuesContainer;
  @Input() i: number; // html input id (input + i)

  constructor(private renderer: Renderer2,
              private dialog: MatDialog) { }

  ngOnInit(): void {
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


  saveContainerName(value: string, inputId: string): void {
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

  addIssue(): void {
    const issueDialog = this.dialog.open(IssueCreateModalComponent, {
      data: { container: this.container }
    });

    issueDialog.afterClosed().subscribe((value => {

    }));
  }
}
