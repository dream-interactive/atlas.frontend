import { Component, OnInit } from '@angular/core';
import {SiteTheme, ThemeService} from '../../services/theme.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {delay} from 'rxjs/operators';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  theme: SiteTheme = ThemeService.defaultTheme;

  constructor(public translate: TranslateService,
              private themeService: ThemeService,
              public route: Router,
              private oktaAuth: OktaAuthService) {

    themeService.theme$.pipe(delay(1)).subscribe(theme => this.theme = theme);
  }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    const authenticated = await this.oktaAuth.isAuthenticated();
    if (authenticated) {
      this.route.navigate(['start']);
    }
  }

  goToStart(): void {
    this.route.navigate(['start']);
  }
}
