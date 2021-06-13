import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {Application, ItemEventData} from '@nativescript/core';
import {Organization, Project} from '@src/app/shared/atlas/entity.service';
import {from, Observable, Subscription, zip} from 'rxjs';
import {ProjectService} from '@src/app/web/project/services/project.service';
import {OrganizationService} from '@src/app/services/organization.service';
import {ProjectModalComponent} from '@src/app/mobile/project/project-modal/project-modal.component';
import {ModalDialogService} from '@nativescript/angular';
import {DropDown, SelectedIndexChangedEventData, ValueList} from 'nativescript-drop-down';

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
  private selectedIndex: '';


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
    this.$usersOrganizations = this.organizationService.findAllByUserId('00u2v5jxvoGXWqQTw4x7')
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
      }, error => this.loading = false);

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
    const orga = this.organizations.filter(org => org.id === project.organizationId)[0];
    if (orga) {
      return orga;
    }

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

    console.log('selectedIndex', this.selectedIndex);

    const orgId = this.organizations.find(org => org.name === this.organizationName[this.selectedIndex]);
    this.projectsFilter = this.projects.filter(project => project.organizationId === orgId.id);


    console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
  }

  public onopen(): void {
    console.log("Drop Down opened.");
  }

  public onclose(): void {
    console.log("Drop Down closed.");
  }
}
