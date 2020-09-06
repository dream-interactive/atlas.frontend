import { Component, OnInit } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';
import { Octokit } from '@octokit/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  profile: KeycloakProfile;
  githubToken = '';
  isLoggedIn = false;


  constructor(private ks: KeycloakService, private http: HttpClient) { }

  ngOnInit(): void {
    this.ks.isLoggedIn().then(value => {
      this.isLoggedIn = value;
    });
  }

  logout(): void {
    this.ks.logout('http://localhost:4200/').then();
  }

  logIn(): void {
    this.ks.login().then();
  }

  getUser(): void {
    this.ks.getToken().then(token => {
      console.log('token', token);
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      this.http.get(`http://localhost:8080/auth/realms/Atlas.local/broker/github/token`, {headers, responseType: 'blob'}).subscribe(t => {

        const fr = new FileReader();

        fr.onload = () => {
          const result = fr.result.toString();
          const strings = result.split('&');
          const tokens = strings[0].split('=');
          this.githubToken = tokens[1];
        };
        fr.readAsText(t);

        const octokit = new Octokit({
          auth: this.githubToken
        });
        octokit.request(`/user`).then(user => console.log('user', user));
      });
    });
  }
}

