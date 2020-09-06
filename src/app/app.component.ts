import {Component, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private ks: KeycloakService) {
  }

  ngOnInit(): void {
    if (this.ks.isTokenExpired()) {

    }
  }
}
