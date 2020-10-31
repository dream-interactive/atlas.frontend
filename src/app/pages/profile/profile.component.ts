import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {HttpClient} from '@angular/common/http';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  users: any[] = [];
  user = {};

  token: string;

  constructor(public auth: AuthService,
              private  http: HttpClient,
              public ps: ProfileService) {

  }

  ngOnInit(): void {

    this.auth.getUser$().subscribe( (u) => {
      this.user = u;
      }
    );
  }

  getUsers(): void {
    this.http.get<any>('http://localhost:9000/users').subscribe(us => this.users = us);
  }

}
