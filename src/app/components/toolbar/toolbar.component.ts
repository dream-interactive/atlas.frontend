import {ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {SiteTheme, ThemeService} from '../../services/theme.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  theme: SiteTheme;

  constructor(public auth: AuthService,
              public translate: TranslateService,
              private themeService: ThemeService) {
    this.theme = ThemeService.defaultTheme;
    this.themeService.theme$.subscribe(theme => this.theme = theme);
  }
}
