import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AtlasUser, Organization} from '@src/app/shared/atlas/entity.service';
import {OrganizationService} from '@src/app/services/organization.service';
import {ProfileService} from '@src/app/services/profile.service';
import {MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';

@Component(
  {
    moduleId: module.id,
    selector: 'app-organization',
    templateUrl: './organization-modal.component.tns.html',
    styleUrls: ['./organization-modal.component.tns.scss']
  })
export class OrganizationModalComponent{
  organizationForm: FormGroup;
  organization: Organization;
  organizations: Organization[];
  userProfile: AtlasUser;


  constructor(private organizationService: OrganizationService,
              private profileService: ProfileService,
              private  dialog: MatDialogRef<OrganizationModalComponent>,
              private translateService: TranslateService) {

   // profileService.profile$.subscribe(profile => this.userProfile = {...profile});

  }

  ngOnInit(): void {
    this.organizationService.userOrganizations$.subscribe((organizations) => this.organizations = organizations);
  }

}
