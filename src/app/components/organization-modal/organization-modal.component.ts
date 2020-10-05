import { Component, OnInit } from '@angular/core';
import {Organization, OrganizationService} from '../../services/organization.service';
import {ProfileService} from '../../services/profile.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss']
})
export class OrganizationModalComponent implements OnInit {
  organizationForm: FormGroup;
  organization: Organization;
  orgName = new FormControl('',
    [Validators.required, Validators.pattern('^[a-zA-Z](?:-?[a-zA-Z0-9]+)*')]
  );

  constructor(private organizationService: OrganizationService,
              private profileService: ProfileService,
              private  dialog: MatDialogRef<OrganizationModalComponent>)
{

    this.organizationForm = new FormGroup({
      name: this.orgName
  })
    ;
  }

  ngOnInit(): void {

  }

  create(): void {
    if (this.organizationForm.valid) {
      const organizationDate = {...this.organizationForm.value};
      this.profileService.profile$.subscribe(user => {
        this.organization = {
          name: organizationDate.name,
          owner: user.sub
        };
        this.organizationService.save(this.organization);
      });
      this.dialog.close();
    }
  }

  getOrganizationNameErrorMessage(): string {

    if (this.orgName.hasError('required')) {
      return 'You must enter a value';
    }
    return (this.orgName.hasError('pattern'))
      ? 'Organization name should start with latin alphabet letters(case insensitive), can contain numbers and dash(inside)'
      : '';
  }
}

