import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../services/organization.service';
import {ProjectService} from '../../../project/services/project.service';
import {StartSkeletonComponent} from '../../components/start-skeleton/start-skeleton.component';
import {from, Observable, Subscription, zip} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {OktaAuthService} from '@okta/okta-angular';
import {ProjectModalComponent} from '../../../../components/project-modal/project-modal.component';
import {OrganizationModalComponent} from '../../../../components/organization-modal/organization-modal.component';
import {UserClaims} from '@okta/okta-auth-js/lib/types';
import {switchMap} from 'rxjs/operators';
import {Organization, Project} from '../../../../shared/atlas/entity.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

  organizations: Organization[] = [];
  projects: Project[] = [];
  skeleton = StartSkeletonComponent;
  private $projectsAndOrganizations: Subscription = Subscription.EMPTY;

  loading = true;

  constructor(public dialog: MatDialog,
              private organizationService: OrganizationService,
              private projectService: ProjectService,
              private auth: OktaAuthService) {

    this.loading = true;

    this.$projectsAndOrganizations = this.findProjectsAndOrganizationsByUser(this.auth.getUser())
      .subscribe(([organizations, projects]) => {
          this.organizations = organizations;
          this.organizationService.updateOrganizationsSubject(organizations);
          this.projects = projects;
          this.projectService.updateProjectsSubject(projects);
          this.loading = false;
        },
        error => this.loading = false
      );
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.$projectsAndOrganizations.unsubscribe();
  }

  openCreateProjectPopup(): void {
    this.dialog.open(ProjectModalComponent, {
      panelClass: ['full-screen-modal']
    });
  }

  openCreateOrganizationPopup(): void {
    this.dialog.open(OrganizationModalComponent);
  }


  getOrganizationByProject(project: Project): Organization {
    return this.organizations.filter(org => org.id === project.organizationId)[0];
  }

  private findProjectsAndOrganizationsByUser(user$: Promise<UserClaims>): Observable<[Organization[], Project[]]> {
    return from(user$).pipe(
      switchMap((user) => {
        const organizations$ = this.organizationService.findAllByUserId(user.sub);
        const projects$ = this.projectService.findAllByUserId(user.sub);
        return zip(organizations$, projects$);
      })
    );
  }
}
