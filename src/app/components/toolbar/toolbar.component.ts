import { Component, OnInit } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  // TODO tmp
  username = '';

  constructor(private ks: KeycloakService) { }

  ngOnInit(): void {
    this.username = this.ks.getUsername();
    this.ks.getToken().then(r => console.log('token', r));
  }

  logout(): void {
    this.ks.logout('http://localhost:4200/').then();
  }
}
