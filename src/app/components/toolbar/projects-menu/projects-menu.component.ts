import {Component, OnInit} from '@angular/core';
import {Project, ProjectService} from '../../../services/project.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-projects-menu',
  templateUrl: './projects-menu.component.html',
  styleUrls: ['./projects-menu.component.scss']
})
export class ProjectsMenuComponent implements OnInit {

  projects: Project[];
  currentProject: Project = {
    id: '', issuesTypes: [], key: '', name: '', type: undefined
  };


  constructor(private projectService: ProjectService,
              private router: Router,
              private translator: TranslateService) {
    translator.get('navbar.dropdown.projects').subscribe(res => {
      this.currentProject.name = res; // Get default value on first load
    });
    translator.onLangChange.pipe(
      mergeMap(() => translator.get('navbar.dropdown.projects'))
    ).subscribe(res => this.currentProject.name = res); // Get default value on lang change
  }

  ngOnInit(): void {

    if (this.router.url.match('projects/+/^[a-z0-9]+$/i')) {
      console.log('rout', this.router.url);
    }
  }


}
