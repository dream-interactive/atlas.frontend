import {Component} from '@angular/core';
import {AtlasUser, ProfileService} from '../../../services/profile.service';
import {Observable} from 'rxjs';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent{

  public profile: Observable<AtlasUser>;
  origin: string;

  constructor(public auth: OktaAuthService,
              private userService: ProfileService) {
    this.profile = userService.profile$;
    this.origin = window.location.origin;
  }
}
