import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ProfileService, UserProfile} from '../../../services/profile.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent{

  public profile: Observable<UserProfile>;

  constructor(public auth: AuthService,
              private userService: ProfileService) {
    this.profile = userService.profile$;
  }
}
