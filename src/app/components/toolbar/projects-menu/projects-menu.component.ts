import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from '../../../web/project/services/project.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {filter, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {SiteTheme, ThemeService} from '../../../shared/theme.service';
import {OrganizationService} from '../../../services/organization.service';
import {MatDialog} from '@angular/material/dialog';
import {ProjectModalComponent} from '../../project-modal/project-modal.component';
import {from, Subscription} from 'rxjs';
import {OktaAuthService} from '@okta/okta-angular';
import {Organization, Project} from '../../../shared/atlas/entity.service';

@Component({
  selector: 'app-projects-menu',
  templateUrl: './projects-menu.component.html',
  styleUrls: ['./projects-menu.component.scss']
})
export class ProjectsMenuComponent implements OnInit, OnDestroy {

  theme: SiteTheme;


  projects: Project[] = [];

  currentProject: Project = this.setDefaultProjectData();

  orgs: Organization[] = [];
  private $projects = Subscription.EMPTY;
  private $orgs = Subscription.EMPTY;
  private $translator = Subscription.EMPTY;

  constructor(private projectService: ProjectService,
              private organizationService: OrganizationService,
              public auth: OktaAuthService,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private translator: TranslateService,
              private themeService: ThemeService) {

    this.theme = ThemeService.defaultTheme;
    this.themeService.theme$.subscribe(theme => this.theme = theme);

    this.$projects = from(auth.getUser()).pipe(
      switchMap((user) => {
        return projectService.findAllByUserId(user.sub).pipe(
          switchMap((projects) => {
            projectService.updateProjectsSubject(projects);
            return projectService.projects$.pipe(
              mergeMap((ps) => {
                this.projects = ps;
                return router.events
                  .pipe(
                    filter((e) => e instanceof NavigationEnd),
                    startWith(router)
                  );
              })
            );
          })
        );
      })
    ).subscribe((event: NavigationEnd) => {
      if (event.url.match(new RegExp('/o/([a-z0-9-])+/'))) {
        const projectKey = route.children[0].snapshot.url[3].path; // project's key is a 4 part in url
        this.currentProject = this.setProjectData(projectKey);
      } else {
        this.currentProject = this.setDefaultProjectData();
      }
    });

  }

  ngOnInit(): void {

    this.$orgs = this.organizationService.userOrganizations$
      .subscribe((orgs) => this.orgs = orgs);

    // Subscribe on lang change
    this.$translator = this.translator.onLangChange.subscribe(() => {
      if (!this.router.url.match(new RegExp('/o/([a-z0-9-])+/'))){
        this.currentProject = this.setDefaultProjectData();
      }
    }); // Set default value on lang change


  }


  goTo(id: string): void {

    const projects = this.projects.filter(p => p.idp === id);
    const projectName = projects[0].name.toLowerCase();
    const projectKey = projects[0].key;

    const organizations = this.orgs.filter(o => o.id === projects[0].organizationId);
    const organizationName = organizations[0].name.toLowerCase();
    this.router.navigate([`/o/${organizationName}/${projectName}/${projectKey}`]);
  }

  goToProjects(): void {
    this.router.navigate([`/start`]);
  }

  create(): void {
    this.dialog.open(ProjectModalComponent);
  }

  private setProjectData(routeProjectKey: string): Project {

    const projects = this.projects.filter((project) => project.key === routeProjectKey);

    if (projects.length > 0) {
      return projects[0];
    } else {
      return this.setDefaultProjectData();
    }
  }

  private setDefaultProjectData(): Project {

    const project: Project = {
      img: '', key: '', leadId: '', name: '', organizationId: '', type: undefined
    };
    project.name = this.translator.instant('navbar.dropdown.projects');

    project.img = 'assets/images/icon-business-pack/svg/101-organization-1.svg';

    return project;
  }

  ngOnDestroy(): void {
    this.$projects.unsubscribe();
    this.$orgs.unsubscribe();
    this.$translator.unsubscribe();
  }
}
