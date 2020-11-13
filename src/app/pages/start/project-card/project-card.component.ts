import {Component, OnInit} from '@angular/core';
import {Project, ProjectService} from '../../../services/project.service';
import {Organization, OrganizationService} from '../../../services/organization.service';
import {ProfileService, UserProfile} from '../../../services/profile.service';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  projects: Project[] = [];
  organizations: Organization [] = [];
  leads: Set<UserProfile>  = new Set();

  constructor( private orgService: OrganizationService,
               private projectService: ProjectService,
               private userService: ProfileService) { }

  ngOnInit(): void {
    this.orgService.userOrganizations$.subscribe((orgs) => this.organizations = orgs); // subscribe on organizations
    this.projectService.projects$
      .pipe(
        mergeMap((projects) => this.projects = projects), // subscribe on projects
        mergeMap((project) => {
          return this.userService.findById(project.leadId); // find lead of project
        })
      )
      .subscribe((lead) => this.leads.add(lead));
  }

  getOrganization(id: string): Organization{
    const organizationsFiltered = this.organizations.filter((org) => org.id === id);
    return organizationsFiltered[0];
  }

  getProjectLead(leadId: string): UserProfile {
    let userProfile: UserProfile;
    this.leads.forEach(user => {
      if (user.sub === leadId) {
        userProfile = user;
      }
    });
    const userp: UserProfile = {email: '', emailVerified: false, name: '', nickname: '', picture: '', sub: '', updatedAt: ''};
    return userProfile ? userProfile : userp ;
  }
}
