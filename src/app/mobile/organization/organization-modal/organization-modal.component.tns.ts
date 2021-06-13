import {Component} from '@angular/core';
import {OrganizationService} from '@src/app/services/organization.service';
import {AtlasUser, Organization} from '@src/app/shared/atlas/entity.service';
import {ModalDialogParams} from '@nativescript/angular';


@Component(
  {
    moduleId: module.id,
    selector: 'app-organization',
    templateUrl: './organization-modal.component.tns.html',
    styleUrls: ['./organization-modal.component.tns.scss']
  })
export class OrganizationModalComponent{
  organization: Organization;
  organizations: Organization[];
  userProfile: {
    sub: '00u2v5jxvoGXWqQTw4x7'
  } ;
  nameControl: '';

  constructor(private organizationService: OrganizationService,
              private modalParams: ModalDialogParams
              ) {  }

  ngOnInit(): void {
    this.organizationService.userOrganizations$.subscribe((organizations) => this.organizations = organizations);

  }

  create(name: string): void {

    if (name) {
      const organization: Organization = {
        name: this.nameControl,
        ownerUserId: '00u2v5jxvoGXWqQTw4x7',
        validName: this.createOrgValidName(name)
      };

      this.organizationService.create(organization).subscribe(
        (org) => {
          this.organizations.push(org);
          this.organizationService.updateOrganizationsSubject(this.organizations);
          this.modalParams.closeCallback();
        },
        error => {
          if (error.status === 409) {
            console.log('error', error);
           // this.nameControl.setErrors({ notUnique: true });
          }
        }
      );
    }
  }



  createOrgValidName(name: string): string {
    name =  name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/\-+/g, '-');
    return name;
  }

}
