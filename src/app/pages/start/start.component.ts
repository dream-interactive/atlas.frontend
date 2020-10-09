import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Organization} from '../../services/organization.service';
import {OrganizationModalComponent} from '../../components/organization-modal/organization-modal.component';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  organizations: Organization[] = []; // TODO Create entity Organization

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  createOrganization(): void{
    this.dialog.open(OrganizationModalComponent, {
      // panelClass: ['full-screen-modal']
    });
  }

}
