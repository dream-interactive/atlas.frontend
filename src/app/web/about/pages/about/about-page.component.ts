import { Component, OnInit } from '@angular/core';
import {SiteTheme, ThemeService} from '../../../../shared/theme.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  theme: SiteTheme = ThemeService.defaultTheme;

  constructor(public translate: TranslateService,
              private themeService: ThemeService,
              public route: Router) {

    themeService.theme$.pipe(delay(1)).subscribe(theme => this.theme = theme);
  }

  goToStart(): void{
    this.route.navigate(['start']);
  }

  ngOnInit(): void {
  }

}
