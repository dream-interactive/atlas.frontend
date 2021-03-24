import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../services/organization.service';
import {ProjectService} from '../../../project/services/project.service';
import {Subscription} from 'rxjs';
import {Organization, Project} from '../../../../shared/atlas/entity.service';

@Component({
  selector: 'app-org-card',
  templateUrl: './org-card.component.html',
  styleUrls: ['./org-card.component.scss']
})
export class OrgCardComponent implements OnInit, OnDestroy {

  @Input()
  organization: Organization;
  projects: Project[] = [];
  projectsSubscription: Subscription;

  constructor(private orgService: OrganizationService,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectsSubscription = this.projectService.projects$.subscribe(projects => {
      this.projects = projects.filter(project => project.organizationId === this.organization.id);
    });
  }

  ngOnDestroy(): void {
    this.projectsSubscription.unsubscribe();
  }
}
