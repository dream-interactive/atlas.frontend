import { Component, OnInit } from '@angular/core';
import {Organization, OrganizationService} from '../../services/organization.service';
import {ProfileService} from '../../services/profile.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss']
})
export class OrganizationModalComponent implements OnInit {
  organizationForm: FormGroup;
  organization: Organization;
  errorMessages: string;
  orgName = new FormControl('',
    [Validators.required,
      Validators.pattern('^[a-zA-Z](?:-?[a-zA-Z0-9 ]+)*'),
      Validators.minLength(3)]
  );

  constructor(private organizationService: OrganizationService,
              private profileService: ProfileService,
              private  dialog: MatDialogRef<OrganizationModalComponent>,
              private translateService: TranslateService) {
    this.organizationForm = new FormGroup({
      name: this.orgName
    });
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
    this.translateService.get(['empty', 'wrong', 'short']).subscribe(translations => {

      if (this.orgName.hasError('required')) {
        this.errorMessages =  translations.empty;
      }
    else if (this.orgName.hasError('minlength')){
      this.errorMessages = translations.short;
      }
    else  if (this.orgName.hasError('pattern')) {
      this.errorMessages  = translations.wrong;
      }

    });
    return this.errorMessages;
  }

}

