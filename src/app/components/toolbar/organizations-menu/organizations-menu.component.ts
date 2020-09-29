import { Component, OnInit } from '@angular/core';
import {Organization} from '../../../services/organization.service';
import {TranslateService} from '@ngx-translate/core';
import {mergeMap} from 'rxjs/operators';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-organizations-menu',
  templateUrl: './organizations-menu.component.html',
  styleUrls: ['./organizations-menu.component.scss']
})
export class OrganizationsMenuComponent implements OnInit {


  yourOrgs: Organization = {
    id: 'yourOrgsId', name: '', image: '../../assets/images/organization.svg'
  };
  createOrg: Organization = {
    id: 'createId', name: '', image: '../../assets/images/check.svg'
  };
  orgs: Organization[] = [];


  constructor(  private translator: TranslateService) {
    translator.get(['navbar.dropdown.orgs', 'navbar.dropdown.new']).subscribe(res => {
      this.yourOrgs.name = res['navbar.dropdown.orgs']; // Get default value on first load
      this.createOrg.name = res['navbar.dropdown.new'];
    });
    translator.onLangChange.pipe(
      mergeMap(() => translator.get(['navbar.dropdown.orgs', 'navbar.dropdown.new']))
    ).subscribe(res => {
      this.yourOrgs.name =  res['navbar.dropdown.orgs'];
      this.createOrg.name = res['navbar.dropdown.new'];
    }); // Get default value on lang change
  }

  ngOnInit(): void {
  }

  selectOrganization($event: MatSelectChange): void {

  }
}
