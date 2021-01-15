import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Project, ProjectService} from '../../services/project.service';
import {mergeMap, startWith} from 'rxjs/operators';
import {Organization, OrganizationService} from '../../services/organization.service';
import {Observable} from 'rxjs';

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
    private activateRoute: ActivatedRoute) {
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
}
