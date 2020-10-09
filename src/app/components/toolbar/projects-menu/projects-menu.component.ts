import {Component, OnInit} from '@angular/core';
import {Project, ProjectService} from '../../../services/project.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {filter, mergeMap} from 'rxjs/operators';
import {SiteTheme, ThemeService} from '../../../services/theme.service';
import {Organization} from '../../../services/organization.service';
import {MatDialog} from '@angular/material/dialog';
import {ProjectModalComponent} from '../../project-modal/project-modal.component';

@Component({
  selector: 'app-projects-menu',
  templateUrl: './projects-menu.component.html',
  styleUrls: ['./projects-menu.component.scss']
})
export class ProjectsMenuComponent implements OnInit {

  theme: SiteTheme;

  projects: Project[] = [];

  currentProject: string;

  removeOrg: Organization = {
    id: 'cb0f40bb-9d8c-4c1c-802f-6bc15cc63cda', image: '../../../assets/images/icon-business-pack/svg/101-laptop.svg', name: 'Remove'
  };

  orgs: Organization[] = [this.removeOrg];


  constructor(private projectService: ProjectService,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private translator: TranslateService,
              private themeService: ThemeService) {
    this.theme = ThemeService.defaultTheme;
    this.themeService.theme$.subscribe(theme => this.theme = theme);

    const currentUrl = this.router.url;

    if (currentUrl.match(new RegExp('/o/([a-z0-9-])+/'))) {

      const projectName = route.children[0].snapshot.url[2].path; // project is a third part in url

      if (projectName) {
        this.setNameOfCurrentProject(projectName);
      } else {
        this.getDefaultProjectNameFromTranslator();
      }

    } else {
      this.getDefaultProjectNameFromTranslator(); // Get default value on first loa
    }
    // Subscribe on lang change
    this.translator.onLangChange.pipe(
      mergeMap(() => this.translator.get(['navbar.dropdown.projects']))
    ).subscribe(res => {
      this.currentProject = res['navbar.dropdown.projects'];
    }); // Get default value on lang change

    router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const eventUrl = event.url;
        if (eventUrl.match(new RegExp('/o/([a-z0-9-])+/'))) {
          const projectName = route.children[0].snapshot.url[2].path; // project is a third part in url
          this.setNameOfCurrentProject(projectName);
        } else {
          this.getDefaultProjectNameFromTranslator();
        }
      });
  }

  ngOnInit(): void {

    this.projectService.projects$.subscribe( prjcts => {
      this.projects = prjcts;
    });
  }


  goTo(id: string): void {

    const projects = this.projects.filter(p => p.id === id);
    const projectName = projects[0].name.toLowerCase();

    const organizations = this.orgs.filter(o => o.id === projects[0].organizationId);
    const organizationName = organizations[0].name.toLowerCase();
    this.router.navigate([`/o/${organizationName}/${projectName}`]);
  }

  goToProjects(): void {
    this.router.navigate([`/start`]);
  }

  goToCreate(): void {
    this.dialog.open(ProjectModalComponent, {
      panelClass: ['full-screen-modal']
    });
  }

  private setNameOfCurrentProject(route: string): void {
    const projects = this.projects
      .filter((project) => project.name.toLowerCase() === route);

    if (projects.length > 0) {
      this.currentProject = projects[0].name;
    }
    else {
      // todo 404
      this.getDefaultProjectNameFromTranslator();
    }
  }

  private getDefaultProjectNameFromTranslator(): void {
    this.translator.get(['navbar.dropdown.projects']).subscribe((res) => {
      this.currentProject = res['navbar.dropdown.projects'];
    });
  }
}
