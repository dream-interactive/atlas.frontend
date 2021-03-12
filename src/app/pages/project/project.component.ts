import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Project, ProjectService} from '../../services/project.service';
import {map, mergeMap, startWith} from 'rxjs/operators';
import {OrganizationService} from '../../services/organization.service';
import {EMPTY, from, Observable} from 'rxjs';

import { onSideNavChange, animateText } from '../../animations/animations';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class ProjectComponent implements OnInit, AfterViewInit {

  currentProject: Observable<Project> = EMPTY;

  isShowing = false;
  linkText = false;

  @ViewChild('matSidenav', { read: ElementRef }) matSidenav: ElementRef;

  constructor(
    private projectService: ProjectService,
    private organizationService: OrganizationService,
    private activateRoute: ActivatedRoute,
    private elementRef: ElementRef) {

    this.currentProject = this.activateRoute.params
      .pipe(
        mergeMap((params) => {
          const organizationValidName = params[`organization`];
          const key = params[`key`];

          // response is a Flux<Project> with one element
          return this.projectService.findByOrganizationValidNameAndProjectKey(organizationValidName, key)
            .pipe(
              map((project) => {
                this.projectService.updateProjectSubject(project[0]);
                return project[0];
              }),
              startWith({
                id: '', img: '', isPrivate: false, key: '', leadId: '', name: '', organizationId: '', type: undefined
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
