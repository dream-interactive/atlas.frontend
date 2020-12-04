import {Component, Input, OnInit} from '@angular/core';
import {Organization, OrganizationService} from '../../../services/organization.service';
import {Project, ProjectService} from '../../../services/project.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-org-card',
  templateUrl: './org-card.component.html',
  styleUrls: ['./org-card.component.scss']
})
export class OrgCardComponent implements OnInit {

  @Input()
  organization: Organization;
  projects: Project[] = [];

  constructor(private orgService: OrganizationService,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectService.projects$.subscribe(projects => {
      this.projects = projects.filter(project => project.organizationId === this.organization.id);
    });
  }
}
