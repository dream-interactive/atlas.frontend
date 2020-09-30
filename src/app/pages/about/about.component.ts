import { Component, OnInit } from '@angular/core';
import {SiteTheme, ThemeService} from '../../services/theme.service';
import {AuthService} from '../../services/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  theme: SiteTheme;

  constructor(public translate: TranslateService,
              private themeService: ThemeService) {
    this.theme = ThemeService.defaultTheme;
    this.themeService.theme$.subscribe(theme => this.theme = theme);
  }
  ngOnInit(): void {
  }

}
