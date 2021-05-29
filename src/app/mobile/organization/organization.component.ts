import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ItemEventData} from '@nativescript/core';
import {ModalDialogService} from '@nativescript/angular';
import {OrganizationModalComponent} from '@src/app/components/organization-modal/organization-modal.component';
import {Organization, Project} from '@src/app/shared/atlas/entity.service';
import {from, Observable, Subscription, zip} from 'rxjs';
import {OrganizationService} from '@src/app/services/organization.service';
import {switchMap} from 'rxjs/operators';
import {ProjectModalComponent} from '@src/app/components/project-modal/project-modal.component';
import {UserClaims} from '@okta/okta-auth-js/lib/types';

@Component({
  moduleId: module.id,
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  organizations: Organization[] = [];

  user:{

  }

  private $organizations: Subscription = Subscription.EMPTY;

  countries: { name: string, imageSrc: string }[] = [
    { name: 'New Org', imageSrc: 'res://donut' },


    { name: 'New Org', imageSrc: 'res://donut' },
    { name: 'New Org', imageSrc: 'res://donut' },
    { name: 'New Org', imageSrc: 'res://donut' },
    { name: 'New Org', imageSrc: 'res://donut' },
    { name: 'New Org', imageSrc: 'res://donut' },
  ];
  constructor(private modalDialog: ModalDialogService,
              private  vcRef: ViewContainerRef,
              private organizationService: OrganizationService) {
    // Use the component constructor to inject providers.

    this.$projectsAndOrganizations = this.findProjectsAndOrganizationsByUser(user)
      .pipe(
        switchMap(([organizations]) => {
            this.organizationService.updateOrganizationsSubject(organizations);
            return zip(this.organizationService.userOrganizations$, this.projectService.projects$);
          },
        )
      )
      .subscribe(([organizations, projects]) => {
        this.organizations = organizations;
        this.projects = projects;
        this.loading = false;

      }, error => this.loading = false);
  }


  onItemTap(args: ItemEventData): void {
    console.log('Item with index: ' + args.index + ' tapped');
  }
  navigateAdd(): void  {
    // TODO Create org
  }
  onTouch(args): void {}

  onNavigate(): void {

  }

  addOrg(): void {
    this.modalDialog.showModal(OrganizationModalComponent,
      {

        viewContainerRef: this.vcRef});
  }


  private $projectsAndOrganizations: Subscription = Subscription.EMPTY;

  loading = true;


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
