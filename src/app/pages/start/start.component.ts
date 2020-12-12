import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Organization, OrganizationService} from '../../services/organization.service';
import {OrganizationModalComponent} from '../../components/organization-modal/organization-modal.component';
import {Project, ProjectService} from '../../services/project.service';
import {ProjectModalComponent} from '../../components/project-modal/project-modal.component';


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
    this.projectService.projects$.subscribe(projects => this.projects = projects);
  }

  openCreateProjectPopup(): void {
    this.dialog.open(ProjectModalComponent, {
      panelClass: ['full-screen-modal']
    });
  }

  openCreateOrganizationPopup(): void {
    this.dialog.open(OrganizationModalComponent);
  }
}
