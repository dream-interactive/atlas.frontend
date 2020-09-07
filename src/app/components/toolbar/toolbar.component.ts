import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isLoggedIn = false;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  logout(): void {
  }

  logIn(): void {
  }

  getUser(): void {
  }
}

