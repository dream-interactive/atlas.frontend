import { Component, OnInit } from '@angular/core';
import {Organization, OrganizationService} from '../../../services/organization.service';
import {Project, ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-org-card',
  templateUrl: './org-card.component.html',
  styleUrls: ['./org-card.component.scss']
})
export class OrgCardComponent implements OnInit {

  organizations: Organization [] = [];
  projects: Project[] = [];

  constructor(private orgService: OrganizationService,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.orgService.userOrganizations$.subscribe((orgs) => this.organizations = orgs);
    this.projectService.projects$.subscribe(projects => this.projects = projects);
  }

  getProjectsLength(organization: Organization): number {
    return this.projects.filter(project => project.organizationId === organization.id).length;
  }
}
