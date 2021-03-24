import { Component, OnInit } from '@angular/core';
import {SiteTheme, ThemeService} from '../../shared/theme.service';
import {timer} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  theme: SiteTheme = ThemeService.defaultTheme;

  constructor(private themeService: ThemeService) {
    timer(1000).pipe(
      switchMap(() => {
        return themeService.theme$;
      })
    ).subscribe(theme => this.theme = theme);
  }

  ngOnInit(): void {
  }

}
