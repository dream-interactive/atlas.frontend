import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ProfileService, UserProfile} from '../../../services/profile.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent{

  public profile: UserProfile;


  constructor(public auth: AuthService,
              private userService: ProfileService) {
    if (this.userService.profile$) {
      this.userService.profile$.subscribe(prof => this.profile = prof);
    }
  }
}
