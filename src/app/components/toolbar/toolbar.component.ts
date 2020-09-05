import { Component, OnInit } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  profile: KeycloakProfile;
  isLoggedIn = false;


  constructor(private ks: KeycloakService) { }

  ngOnInit(): void {
    this.ks.isLoggedIn().then(value => {
      this.isLoggedIn = value;
    });
    this.ks.loadUserProfile().then( profile => {
      this.profile = profile;
    });
  }

  logout(): void {
    this.ks.logout('http://localhost:4200/').then();
  }

  logIn(): void {
    this.ks.login().then();
  }
}
