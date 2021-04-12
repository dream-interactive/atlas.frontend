import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {IssuesContainerService} from '../../services/issues-container.service';
import {IssuesContainer} from '../../../../shared/atlas/entity.service';
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

  containers: IssuesContainer[] = [];

  form: FormGroup;
  summaryControl = new FormControl('', Validators.required);

  @ViewChild('newContainer') newContainer: ElementRef;

  $project = Subscription.EMPTY;

  constructor(private renderer: Renderer2,
              private projectService: ProjectService,
              private issuesContainerService: IssuesContainerService) {
    this.form = new FormGroup({
      summary: this.summaryControl
    });
  }

  ngOnInit(): void {
    this.$project = this.projectService.project$.pipe(
      mergeMap((project) => {
        return this.issuesContainerService.findAllByProjectId(project.idp);
      })
    ).subscribe((cs) => {
      this.containers = cs;
      this.issuesContainerService.updateContainers(cs);
    });
  }

  dropContainer(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.containers, event.previousIndex, event.currentIndex);
  }



  createContainer(): IssuesContainer {

    this.newContainer.nativeElement.style.display = 'inline-block';

    return undefined;
  }

  ngOnDestroy(): void {
    this.$project.unsubscribe();
  }

}
