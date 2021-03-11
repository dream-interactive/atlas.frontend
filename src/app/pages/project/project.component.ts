import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, Router} from '@angular/router';
import {Project, ProjectService} from '../../services/project.service';
import {filter, mergeMap, startWith} from 'rxjs/operators';
import {Organization, OrganizationService} from '../../services/organization.service';
import {Observable} from 'rxjs';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projects: Project[] = [];
  organizatios: Organization[] = [];
  organizationName = '';
  projectName = '';
  key = '';
  currentProject: Observable<Project>;

  constructor(
    private projectService: ProjectService,
    private organizationService: OrganizationService,
    private activateRoute: ActivatedRoute,
    private router: Router) {

    const start = router.events.pipe(
      filter(event => event instanceof GuardsCheckStart)
    );
    const end = router.events.pipe(
      filter( event => event instanceof NavigationEnd
                            || event instanceof NavigationCancel
                            || event instanceof NavigationError
      )
    );

  }



  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }



  ngOnInit(): void {

    this.currentProject = this.activateRoute.params
      .pipe(
        mergeMap((params) => {
          const organizationValidName = params[`organization`];
          const key = params[`key`];
          return this.projectService.findByOrganizationValidNameAndProjectKey(organizationValidName, key)
            .pipe(
              startWith({
                id: '', img: '', isPrivate: false, key: '', leadId: '', name: '', organizationId: '', type: undefined
              })
            );
        })
      );
  }

  saveContainerName(): void {

  }
}
