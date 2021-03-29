import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {IssuesContainerService} from '../../services/issues-container.service';
import {IssuesContainer} from '../../../../shared/atlas/entity.service';
import {ProjectService} from '../../services/project.service';
import {mergeMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  containers: IssuesContainer[] = [];

  $project = Subscription.EMPTY;

  constructor(private renderer: Renderer2,
              private projectService: ProjectService,
              private issuesContainerService: IssuesContainerService) { }

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
    return undefined;
  }

  ngOnDestroy(): void {
    this.$project.unsubscribe();
  }

}
