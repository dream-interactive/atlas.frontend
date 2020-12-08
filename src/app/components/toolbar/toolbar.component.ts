import {Component, OnInit} from '@angular/core';
import {SiteTheme, ThemeService} from '../../services/theme.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit{
  theme: SiteTheme = ThemeService.defaultTheme;
  isAuthenticated: boolean;

  constructor(public auth: OktaAuthService,
              public translate: TranslateService,
              private themeService: ThemeService,
              private route: ActivatedRoute,
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
  }

  login(): void {
    this.auth.signInWithRedirect().then();
  }
}
