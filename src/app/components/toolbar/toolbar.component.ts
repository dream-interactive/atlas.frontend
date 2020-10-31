import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {SiteTheme, ThemeService} from '../../services/theme.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  theme: SiteTheme = ThemeService.defaultTheme;

  constructor(public auth: AuthService,
              public translate: TranslateService,
              private themeService: ThemeService,
              public route: Router) {

    themeService.theme$.subscribe(theme => this.theme = theme);
  }

  goToStart(): void{
    this.route.navigate(['start']);
  }
}
