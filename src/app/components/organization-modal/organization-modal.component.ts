import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Organization, OrganizationService} from '../../services/organization.service';
import {ProfileService, UserProfile} from '../../services/profile.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationModalComponent implements OnInit {
  organizationForm: FormGroup;
  organization: Organization;
  organizations: Organization[];
  userProfile: UserProfile;

  nameControl = new FormControl('',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z](?:-?[a-zA-Z0-9 ]+)*')]
  );

  constructor(private organizationService: OrganizationService,
              private profileService: ProfileService,
              private  dialog: MatDialogRef<OrganizationModalComponent>,
              private translateService: TranslateService) {
    this.organizationForm = new FormGroup({
      nameControl: this.nameControl
    });

    profileService.profile$.subscribe(profile => this.userProfile = {...profile});

  }

  ngOnInit(): void {
    this.organizationService.userOrganizations$.subscribe((organizations) => this.organizations = organizations);
  }

  create(): void {
    if (this.organizationForm.valid) {

      const organization: Organization = {
        name: this.nameControl.value,
        ownerUserId: this.userProfile.sub,
        validName: this.createOrgValidName(this.nameControl.value)
      };

      this.organizationService.save(organization).subscribe(
        (org) => {
          this.organizations.push(org);
          this.organizationService.updateOrganizationsSubject(this.organizations);
          this.dialog.close();
        },
        error => {
          if (error.status === 409) {
            this.nameControl.setErrors({ notUnique: true }) ;
          }
        }
      );
    }
  }

  getOrganizationNameErrorMessage(): string {

    if (this.nameControl.hasError('required')) {
      return this.translateService.instant('organization.dialog.errors.empty');
    }
    else if (this.nameControl.hasError('minlength')){
      return this.translateService.instant('organization.dialog.errors.short');
    }
    else if (this.nameControl.hasError('notUnique')) {
      return this.translateService.instant('organization.dialog.errors.notUnique');
    }
    else  if (this.nameControl.hasError('pattern')) {
      return this.translateService.instant('organization.dialog.errors.wrong');
    }
    else  if (this.nameControl.hasError('exist')) {
      return this.translateService.instant('organization.dialog.errors.exist');
    }
    return '';
  }


  createOrgValidName(name: string): string {
    name =  name
              .toLowerCase()
              .trim()
              .replace(/\s+/g, '-')
              .replace(/\-+/g, '-');
    return name;
  }

  do() {

  }
}

