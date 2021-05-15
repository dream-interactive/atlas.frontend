import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TaskContainerService} from '../../services/task-container.service';
import {Project, TasksContainer} from '../../../../shared/atlas/entity.service';
import {ProjectService} from '../../services/project.service';
import {mergeMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  containers: TasksContainer[] = [];
  project: Project;

  summary = '';

  @ViewChild('newContainer') newContainer: ElementRef;

  $project = Subscription.EMPTY;
  $create = Subscription.EMPTY;
  $containers = Subscription.EMPTY;

  loading = false;

  constructor(private renderer: Renderer2,
              private projectService: ProjectService,
              private taskContainerService: TaskContainerService) {
  }

  ngOnInit(): void {
    this.$project = this.projectService.project$.pipe(
      mergeMap((project) => {
        this.project = project;
        return this.taskContainerService.findAllByProjectId(project.idp);
      })
    ).subscribe((cs) => {
      this.containers = cs;
      this.taskContainerService.updateContainers(cs);
    });

    this.$containers = this.taskContainerService.tasksContainers$.subscribe(tc => this.containers = tc);
  }

  ngOnDestroy(): void {
    this.$project.unsubscribe();
    this.$create.unsubscribe();
    this.$containers.unsubscribe();
  }

  dropContainer(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.containers, event.previousIndex, event.currentIndex);
    this.containers.forEach((container, i) => {
      if (container.indexNumber !== i) {
        container.indexNumber = i;
        this.taskContainerService.update(container).subscribe();
      }
    });

  }


  create(): void {

    if (this.summary.trim()) {

      this.loading = true;

      const container: TasksContainer = {
        canBeDeleted: true,
        idp: this.project.idp,
        indexNumber: this.containers.length,
        tasks: [],
        name: this.summary

      };

      this.taskContainerService.create(container).subscribe(
        (c) => {
          this.containers.push(c);
          this.loading = false;
          this.newContainer.nativeElement.style.display = 'none';
          this.taskContainerService.updateContainers(this.containers);
        }, error => {
          this.newContainer.nativeElement.style.display = 'none';
          this.loading = false;
        });
    }



  }



  add(): void {
    this.newContainer.nativeElement.style.display = 'inline-block';
  }
}
