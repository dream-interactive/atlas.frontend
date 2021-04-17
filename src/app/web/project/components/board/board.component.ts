import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TaskContainerService} from '../../services/task-container.service';
import {TasksContainer} from '../../../../shared/atlas/entity.service';
import {ProjectService} from '../../services/project.service';
import {mergeMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  containers: TasksContainer[] = [];

  newContainerForm: FormGroup;
  newContainerSummaryControl = new FormControl('', Validators.required);

  @ViewChild('newContainer') newContainer: ElementRef;

  $project = Subscription.EMPTY;

  constructor(private renderer: Renderer2,
              private projectService: ProjectService,
              private taskContainerService: TaskContainerService) {
    this.newContainerForm = new FormGroup({
      newContainerSummaryControl: this.newContainerSummaryControl
    });
  }

  ngOnInit(): void {
    this.$project = this.projectService.project$.pipe(
      mergeMap((project) => {
        return this.taskContainerService.findAllByProjectId(project.idp);
      })
    ).subscribe((cs) => {
      this.containers = cs;
      this.taskContainerService.updateContainers(cs);
    });
  }

  dropContainer(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.containers, event.previousIndex, event.currentIndex);
  }



  createContainer(): TasksContainer {

    this.newContainer.nativeElement.style.display = 'inline-block';

    return undefined;
  }

  ngOnDestroy(): void {
    this.$project.unsubscribe();
  }

}
