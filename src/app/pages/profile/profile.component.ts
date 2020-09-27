import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  users: any[] = [];

  token: string;

  constructor(public auth: AuthService, private  http: HttpClient) {

  }

  ngOnInit(): void {
  }

  getUsers(): void {
    this.http.get<any>('http://localhost:9000/users').subscribe(us => this.users = us);
  }

}
