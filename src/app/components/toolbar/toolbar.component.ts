import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public profile;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    if (this.auth.userProfile$) {
      this.auth.userProfile$.subscribe(prof => this.profile = prof);
    }
  }
}

