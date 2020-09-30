import { Component, OnInit } from '@angular/core';
import {Organization} from '../../services/organization.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  organizations: Organization[] = []; // TODO Create entity Organization

  constructor() { }

  ngOnInit(): void {
  }

}
