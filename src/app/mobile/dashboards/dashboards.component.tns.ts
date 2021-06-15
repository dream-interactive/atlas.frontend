import {Component, OnInit, Output} from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application } from '@nativescript/core';
import {SelectedIndexChangedEventData} from 'nativescript-drop-down';
import {Project} from '@src/app/shared/atlas/entity.service';
import {ProjectService} from '@src/app/web/project/services/project.service';
import {Subscription} from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'app-dashboards-tns',
  templateUrl: './dashboards.component.tns.html',
  styleUrls: ['./dashboards.component.tns.scss']
})
export class DashboardsComponent implements OnInit {


  projects: Project[] = [];
  projectName: string[];
  selectedIndex: any;

  loading = true;
  private $projectsUser: Subscription = Subscription.EMPTY;
  constructor(
    private projectService: ProjectService

  ) {
    this.$projectsUser = this.projectService.findAllByUserId('00u2v5jxvoGXWqQTw4x7').pipe(

    )
      .subscribe((projects) => {
        this.projects = projects;

        this.projectName = Array.from(projects, project => project.name);
        this.loading = false;

      }, error => this.loading = false);
  }
  ngOnInit(): void {
    // Init your component properties here.
  }

  /*onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }*/

  onchange(args: SelectedIndexChangedEventData) {
    this.selectedIndex  = args.newIndex;
  }
}
