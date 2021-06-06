import {Component, OnDestroy, OnInit} from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import {Application, ItemEventData} from '@nativescript/core';
import {Organization, Project} from '@src/app/shared/atlas/entity.service';
import {from, Observable, Subscription, zip} from 'rxjs';
import {ProjectService} from '@src/app/web/project/services/project.service';
import {OrganizationService} from '@src/app/services/organization.service';
import {switchMap} from 'rxjs/operators';
import {UserClaims} from '@okta/okta-auth-js/lib/types';

@Component({
  moduleId: module.id,
  selector: 'app-Project-ng',
  templateUrl: './project.component.tns.html',
})
export class ProjectComponent implements OnInit, OnDestroy {

  organizations: Organization[] = [];
  projects: Project[] = [];
  private $usersProjects: Subscription = Subscription.EMPTY;
  private $usersOrganizations: Subscription = Subscription.EMPTY;

  user: {
    userId: '00u2v5jxvoGXWqQTw4x7'
  };
  loading = true;

  constructor(
    private organizationService: OrganizationService,
    private projectService: ProjectService,
  ) {
    this.$usersOrganizations = this.organizationService.findAllByUserId('00u2v5jxvoGXWqQTw4x7')
      .subscribe((organizations) => {

        this.organizations = organizations;
        this.loading = false;

      }, error => this.loading = false);
    this.$usersProjects = this.projectService.findAllByUserId('00u2v5jxvoGXWqQTw4x7')
      .subscribe((projects) => {
        this.projects = projects;
        this.loading = false;
      }, error => this.loading = false);
    this.loading = true;


  }

  ngOnInit(): void {
    // Init your component properties here.
  }
  onItemTap(args: ItemEventData): void {
    console.log('Item with index: ' + args.index + ' tapped');
  }

  ngOnDestroy(): void {
    this.$usersOrganizations.unsubscribe();
    this.$usersProjects.unsubscribe();
  }

  getOrganizationByProject(project: Project): Organization {
   // console.log(this.organizations);
    return this.organizations.filter(org => org.id === project.organizationId)[0];
  }

  /*  onDrawerButtonTap(): void {
      const sideDrawer = <RadSideDrawer>Application.getRootView()
      sideDrawer.showDrawer()
    }*/
}
