import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {Application, ItemEventData} from '@nativescript/core';
import {Organization, Project} from '@src/app/shared/atlas/entity.service';
import {from, Observable, Subscription, zip} from 'rxjs';
import {ProjectService} from '@src/app/web/project/services/project.service';
import {OrganizationService} from '@src/app/services/organization.service';
import {ProjectModalComponent} from '@src/app/mobile/project/project-modal/project-modal.component';
import {ModalDialogService} from '@nativescript/angular';
import {DropDown, SelectedIndexChangedEventData, ValueList} from 'nativescript-drop-down';
import {switchMap} from 'rxjs/operators';
import {UserClaims} from '@okta/okta-auth-js/lib/types';

@Component({
  moduleId: module.id,
  selector: 'app-Project-ng',
  templateUrl: './project.component.tns.html',
  styleUrls: ['./project.component.tns.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {

  organizations: Organization[] = [];

  projectsFilter: Project[] = [];
  organizationName: string[];
  projects: Project[] = [];
  private $usersProjects: Subscription = Subscription.EMPTY;
  private $usersOrganizations: Subscription = Subscription.EMPTY;
  private $projectsAndOrganizations: Subscription = Subscription.EMPTY;


  user: {
    userId: '00u2v5jxvoGXWqQTw4x7'
  };
  loading = true;

  constructor(
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private organizationService: OrganizationService,
    private projectService: ProjectService,
  ) {

    this.$projectsAndOrganizations = this.findProjectsAndOrganizationsByUser('00u2v5jxvoGXWqQTw4x7')
      .pipe(
        switchMap(([organizations, projects]) => {
            this.organizationService.updateOrganizationsSubject(organizations);
            this.projectService.updateProjectsSubject(projects);
            return zip(this.organizationService.userOrganizations$, this.projectService.projects$);
          },
        )
      )
      .subscribe(([organizations, projects]) => {
        this.organizations = organizations;
        this.projects = projects;
        this.projectsFilter = projects;
        this.organizationName = Array.from(organizations, org => org.name);

        this.loading = false;

      }, error => this.loading = false);

    /*this.$usersOrganizations = this.organizationService.findAllByUserId('00u2v5jxvoGXWqQTw4x7').pipe()
      .subscribe((organizations) => {
        this.organizations = organizations;
        this.organizationName = Array.from(organizations, org => org.name);
        this.loading = false;

      }, error => this.loading = false);
    this.$usersProjects = this.projectService.findAllByUserId('00u2v5jxvoGXWqQTw4x7')
      .subscribe((projects) => {
        this.projects = projects;
        this.projectsFilter = projects;
        this.loading = false;
      }, error => this.loading = false);*/

  }

  ngOnInit(): void {


  }

  onItemTap(args: ItemEventData): void {
    console.log('Item with index: ' + args.index + ' tapped');
  }

  ngOnDestroy(): void {
    this.$usersOrganizations.unsubscribe();
    this.$usersProjects.unsubscribe();
    this.$projectsAndOrganizations.unsubscribe();
  }

  getOrganizationByProject(project: Project): Organization {
    const orga = this.organizations.filter(org => org.id === project.organizationId)[0];
    if (orga) {
      return orga;
    }

  }


  private findProjectsAndOrganizationsByUser(userId: string): Observable<[Organization[], Project[]]> {
    return from(userId).pipe(
      switchMap((user) => {
        const organizations$ = this.organizationService.findAllByUserId('00u2v5jxvoGXWqQTw4x7');
        const projects$ = this.projectService.findAllByUserId('00u2v5jxvoGXWqQTw4x7');
        return zip(organizations$, projects$);
      })
    );
  }
  /*  onDrawerButtonTap(): void {
      const sideDrawer = <RadSideDrawer>Application.getRootView()
      sideDrawer.showDrawer()
    }*/
  addProject(): void {
    this.modalDialog.showModal(ProjectModalComponent,
      {
        viewContainerRef: this.vcRef
      });
  }


  public onchange(args: SelectedIndexChangedEventData): void {
    const orgId = this.organizations.find(org => org.name === this.organizationName[args.newIndex]);
    this.projectsFilter = this.projects.filter(project => project.organizationId === orgId.id);
  }

  public onopen(): void {
    console.log("Drop Down opened.");
  }

  public onclose(): void {
    console.log("Drop Down closed.");
  }
}
