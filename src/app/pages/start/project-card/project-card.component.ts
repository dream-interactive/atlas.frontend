import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Project, ProjectService} from '../../../services/project.service';
import {Organization, OrganizationService} from '../../../services/organization.service';
import {ProfileService, UserProfile} from '../../../services/profile.service';
import {map, mergeMap, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input()
  project: Project;
  organization: Observable<Organization>;
  lead: Observable<UserProfile>;

  constructor( private orgService: OrganizationService,
               private projectService: ProjectService,
               private userService: ProfileService) { }

  ngOnInit(): void {
    this.organization = this.orgService.userOrganizations$
      .pipe(
        map((orgs) => {
          return orgs.filter((org) => org.id === this.project.organizationId)[0];
        })
      );

    this.lead = this.userService.findById(this.project.leadId)
      .pipe(
        startWith({
          email: '', emailVerified: false, name: '', nickname: '', picture: '', sub: '', updatedAt: ''
        })
      );
  }
}
