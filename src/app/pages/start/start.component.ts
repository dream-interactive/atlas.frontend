import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Organization, OrganizationService} from '../../services/organization.service';
import {OrganizationModalComponent} from '../../components/organization-modal/organization-modal.component';
import {Project, ProjectService} from '../../services/project.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  organizations: Organization[] = [];
  projects: Project[] = [];

  constructor( public dialog: MatDialog,
               private organizationService: OrganizationService,
               private projectService: ProjectService) {

  }

  ngOnInit(): void {
    this.organizationService.userOrganizations$.subscribe(organizations => this.organizations = organizations);
    this.projectService.projects$.subscribe(projects => {
      this.projects = projects;
    });
  }

  createOrganization(): void{
    this.dialog.open(OrganizationModalComponent, {
      // panelClass: ['full-screen-modal']
    });
  }

  getProjectsLength(organization: Organization): number {
    return this.projects.filter(project => project.organizationId === organization.id).length;
  }
}
