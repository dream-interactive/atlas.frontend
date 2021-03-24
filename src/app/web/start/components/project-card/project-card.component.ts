import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from '../../../../services/profile.service';
import {startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AtlasUser, Organization, Project} from '../../../../shared/atlas/entity.service';

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
