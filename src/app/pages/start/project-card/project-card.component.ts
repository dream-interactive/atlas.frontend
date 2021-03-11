import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Project, ProjectService} from '../../../services/project.service';
import {Organization, OrganizationService} from '../../../services/organization.service';
import {AtlasUser, ProfileService} from '../../../services/profile.service';
import {filter, map, startWith} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input()
  project: Project;
  @Input()
  organization: Organization;

  $lead: Observable<AtlasUser>;

  constructor(private userService: ProfileService) { }

  ngOnInit(): void {

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

    this.$lead = this.userService.findAtlasUserById(this.project.leadId).pipe(startWith(start));
  }
}
