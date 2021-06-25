import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {TaskContainerService} from '../../services/task-container.service';
import {switchMap} from 'rxjs/operators';
import {EMPTY, Subscription} from 'rxjs';
import {Project, TasksContainer} from '../../../../shared/atlas/entity.service';

@Component({
  selector: 'app-project-stat-page',
  templateUrl: './project-stat-page.component.html',
  styleUrls: ['./project-stat-page.component.scss']
})
export class ProjectStatPageComponent implements OnInit, OnDestroy {

  containers: TasksContainer[] = [];
  project: Project;

  summary = '';

  @ViewChild('newContainer') newContainer: ElementRef;

  $project = Subscription.EMPTY;
  $create = Subscription.EMPTY;
  $containers = Subscription.EMPTY;

  loading = false;

  options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['TO DO', 'IN WORK', 'DONE']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['10.06.21', '11.06.21', '12.06.21', '13.06.21', '14.06.21', '15.06.21', '16.06.21']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'TO DO',
        type: 'line',
        stack: 'counts',
        areaStyle: { normal: {} },
        data: [12, 7, 7, 4, 4, 4, 4]
      },
      {
        name: 'IN WORK',
        type: 'line',
        stack: 'counts',
        areaStyle: { normal: {} },
        data: [0, 5, 5, 4, 3, 3, 3]
      },
      {
        name: 'DONE',
        type: 'line',
        stack: 'counts',
        areaStyle: { normal: {} },
        data: [0, 0, 0, 1, 5, 5, 5]
      }
    ]
  };

  constructor(private projectService: ProjectService,
              private taskContainerService: TaskContainerService) { }

  ngOnInit(): void {
    this.$project = this.projectService.project$.pipe(
      switchMap((project) => {
        this.loading = true;
        this.project = project;
        if (project.idp) {
          return this.taskContainerService.findAllByProjectId(project.idp);
        } else {
          return EMPTY;
        }
      })
    ).subscribe((cs) => {

      this.containers = cs;
      this.taskContainerService.updateContainers(cs);
      this.loading = false;
    });

    this.$containers = this.taskContainerService.tasksContainers$.subscribe(tc => this.containers = tc);
  }

  ngOnDestroy(): void {
    this.$project.unsubscribe();
    this.$create.unsubscribe();
    this.$containers.unsubscribe();
  }



}
