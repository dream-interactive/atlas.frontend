import {Component, OnInit} from '@angular/core';
import {ProfileService, UserProfile} from '../../../services/profile.service';
import {Observable} from 'rxjs';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent{

  public profile: Observable<UserProfile>;

  constructor(public auth: OktaAuthService,
              private userService: ProfileService) {
    this.profile = userService.profile$;
  }
}
