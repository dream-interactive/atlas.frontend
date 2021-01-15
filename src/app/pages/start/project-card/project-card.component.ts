import {Component, Input, OnInit} from '@angular/core';
import {Project, ProjectService} from '../../../services/project.service';
import {Organization, OrganizationService} from '../../../services/organization.service';
import {AtlasUser, ProfileService} from '../../../services/profile.service';
import {map, startWith} from 'rxjs/operators';
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
  lead: Observable<AtlasUser>;

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
    const start: AtlasUser = {
      email: '',
      emailVerified: false,
      familyName: '',
      givenName: '',
      lastModify: undefined,
      local: '',
      name: '',
      sub: '',
      userPicture: ''
    };
    this.lead = this.userService.findAtlasUserById(this.project.leadId)
      .pipe(
        startWith(start)
      );
  }
}
