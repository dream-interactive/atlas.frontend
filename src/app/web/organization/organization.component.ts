import { Component, OnInit } from '@angular/core';
import {Organization, OrganizationService} from '../../services/organization.service';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  organizations: Organization[];

  constructor(private organizationService: OrganizationService,
              private profileService: ProfileService) { }

  ngOnInit(): void {

  }


}
