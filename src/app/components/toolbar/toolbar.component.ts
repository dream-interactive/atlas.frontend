import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public profile;
  public theme: boolean;

  constructor(public auth: AuthService,
              private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.theme$.subscribe(theme => this.theme = theme);

    if (this.auth.userProfile$) {
      this.auth.userProfile$.subscribe(prof => this.profile = prof);
    }
  }

  changeTheme(checked: boolean): void {
    this.themeService.theme$.next(checked);
  }
}

