import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Organization, OrganizationService} from '../../services/organization.service';
import {ProfileService} from '../../services/profile.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {mergeMap} from 'rxjs/operators';

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

  orgName = new FormControl('',
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
      name: this.orgName
    });
  }

  ngOnInit(): void {
    this.organizationService.userOrganizations$.subscribe((organizations) => this.organizations = organizations);
  }

  create(): void {
    if (this.organizationForm.valid) {
      const organizationDate = {...this.organizationForm.value};
      const name  = organizationDate.name;
      const validName = this.createOrgValidName(name);
      this.organizationService
        .existByValidName(validName)
        .subscribe(exist => {
          if (exist){
            this.orgName.setErrors({exist: true});
          }
          else {
            this.profileService.profile$.subscribe(user => {
              this.organization = {
                validName: this.createOrgValidName(organizationDate.name),
                name: organizationDate.name,
                ownerUserId: user.sub
              };
              this.organizationService.save(this.organization).subscribe(org => {
                this.organizations.push(org);
                this.organizationService.updateUserOrganizationsSubject(this.organizations);
              });
              this.dialog.close();
          });
        }}
      );
    }
  }

  getOrganizationNameErrorMessage(): string {

    if (this.orgName.hasError('required')) {
      return this.translateService.instant('organization.dialog.errors.empty');
    }
    else if (this.orgName.hasError('minlength')){
      return this.translateService.instant('organization.dialog.errors.short');
    }
    else  if (this.orgName.hasError('pattern')) {
      return this.translateService.instant('organization.dialog.errors.wrong');
    }
    else  if (this.orgName.hasError('exist')) {
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

}

