import {Component} from '@angular/core';
import {SiteTheme, ThemeService} from '../../services/theme.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  theme: SiteTheme = ThemeService.defaultTheme;

  constructor(public translate: TranslateService,
              private themeService: ThemeService,
              public route: Router) {

    themeService.theme$.pipe(delay(1)).subscribe(theme => this.theme = theme);
  }

  goToStart(): void{
    this.route.navigate(['start']);
  }

}
