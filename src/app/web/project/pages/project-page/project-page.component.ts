import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {ProjectService} from '../../services/project.service';
import {OrganizationService} from '../../../../services/organization.service';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {animateText, onSideNavChange} from '../../../../animations/sidenav-animations';
import {Project} from '../../../../shared/atlas/entity.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class ProjectPageComponent implements OnInit, AfterViewInit {

  currentProject: Observable<Project> = EMPTY;

  isShowing = false;
  linkText = false;

  @ViewChild('matSidenav', { read: ElementRef }) matSidenav: ElementRef;

  constructor(
    private projectService: ProjectService,
    private organizationService: OrganizationService,
    private activateRoute: ActivatedRoute) {

    this.currentProject = this.activateRoute.params
      .pipe(
        switchMap((params) => {
          const organizationValidName = params[`organization`];
          const key = params[`key`];

          const project: Project = {
            key: '', leadId: '', name: '', organizationId: '', type: 0
          };

          // response is a Flux<Project> with one element
          return this.projectService.findByOrganizationValidNameAndProjectKey(organizationValidName, key)
            .pipe(
              startWith([project]),
              map((projects) => {
                this.projectService.updateProjectSubject(projects[0]);
                return projects[0];
              })
            );
        })
      );
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    this.matSidenav.nativeElement.addEventListener('mouseenter', () => {
      setTimeout(() => this.isShowing = !this.isShowing , 1000);
      setTimeout(() => this.linkText = this.isShowing, 1200);
    });

    this.matSidenav.nativeElement.addEventListener('mouseleave', () => {
      this.isShowing = !this.isShowing;
      setTimeout(() => this.linkText = this.isShowing, 200);
    });

  }

}
