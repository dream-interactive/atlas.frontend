import { Component, OnInit } from '@angular/core';
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

  constructor(private  http: HttpClient,
              public ps: ProfileService) {

  }

  ngOnInit(): void {

  }

  getUsers(): void {
    this.http.get<any>('http://localhost:9000/users').subscribe(us => this.users = us);
  }

}
