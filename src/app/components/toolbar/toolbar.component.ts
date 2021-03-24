import {Component, OnInit} from '@angular/core';
import {SiteTheme, ThemeService} from '../../shared/theme.service';
import {TranslateService} from '@ngx-translate/core';
import {NavigationEnd, Router} from '@angular/router';
import {OktaAuthService} from '@okta/okta-angular';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit{
  theme: SiteTheme = ThemeService.defaultTheme;
  isAuthenticated: boolean;
  docs = false;

  constructor(public auth: OktaAuthService,
              public translate: TranslateService,
              private themeService: ThemeService,
              public router: Router) {

    themeService.theme$.subscribe(theme => this.theme = theme);
  }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    this.isAuthenticated = await this.auth.isAuthenticated();
    // Subscribe to authentication state changes
    this.auth.$authenticationState.subscribe(
      (isAuthenticated)  => this.isAuthenticated = isAuthenticated
    );

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.docs = !!event.url.match('docs');
      });
  }

  login(): void {
    this.auth.signInWithRedirect().then();
  }
}
