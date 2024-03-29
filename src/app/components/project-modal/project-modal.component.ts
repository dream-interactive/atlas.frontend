import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrganizationService} from '../../services/organization.service';
import {ProjectService} from '../../web/project/services/project.service';
import {MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {ProfileService} from '../../services/profile.service';
import {AtlasUser, Organization, Project} from '../../shared/atlas/entity.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {

  organizations: Organization[] = [];

  projects: Project[] = [];
  projectForm: FormGroup;
  projectNameControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z](?:-?[a-zA-Z0-9]+)*')]);
  projectKeyControl = new FormControl(
    '',
    [Validators.required,
      Validators.pattern('^[A-Z][A-Z0-9]*'),
      Validators.minLength(3),
      Validators.maxLength(5)]
  );
  organizationControl = new FormControl('', Validators.required);
  selectedOrganization: any;


  projectType = 1;
  userProfile: AtlasUser;

  constructor(private orgService: OrganizationService,
              private  dialog: MatDialogRef<ProjectModalComponent>,
              private ps: ProjectService,
              private profileService: ProfileService,
              private translateService: TranslateService) {
    this.projectForm = new FormGroup({
      projectName: this.projectNameControl,
      projectKey: this.projectKeyControl,
      organizationControl: this.organizationControl
    });

    profileService.profile$.subscribe(profile => this.userProfile = {...profile});
  }

  ngOnInit(): void {
    this.orgService.userOrganizations$.subscribe((orgs) => {
      this.organizations = orgs;
      this.organizationControl.setValue(orgs[0].id);
    });

    this.ps.projects$.subscribe(projects => this.projects = projects);
  }

  create(): void {
    if (this.projectForm.valid) {
      const project: Project = {
        name: this.projectNameControl.value,
        key: this.projectKeyControl.value,
        organizationId: this.organizationControl.value,
        type: this.projectType,
        leadId: this.userProfile.sub
      };

      this.ps.create(project).subscribe(
        proj => {
          this.projects.push(proj);
          this.ps.updateProjectsSubject(this.projects);
          this.dialog.close();
        }, error => {
          if (error.status === 409) {
            this.projectForm.get('projectKey').setErrors({notUnique: true});
          }
        }
      );
    }
  }

  getProjectNameErrorMessage(): string {

    if (this.projectNameControl.hasError('required')) {
      return this.translateService.instant('project.dialog.errors.nameField.empty');
    } else if (this.projectNameControl.hasError('pattern')) {
      return this.translateService.instant('project.dialog.errors.nameField.wrong');
    }
    return '';
  }

  getProjectKeyErrorMessage(): string {
    if (this.projectKeyControl.hasError('required')) {
      return this.translateService.instant('project.dialog.errors.keyField.empty');
    } else if (this.projectKeyControl.hasError('minLength')) {
      return this.translateService.instant('project.dialog.errors.keyField.minLength');
    } else if (this.projectKeyControl.hasError('maxLength')) {
      return this.translateService.instant('project.dialog.errors.keyField.maxLength');
    } else if (this.projectKeyControl.hasError('notUnique')) {
      return this.translateService.instant('project.dialog.errors.keyField.notUnique');
    }
    return (this.projectKeyControl.hasError('pattern'))
      ? this.translateService.instant('project.dialog.errors.keyField.empty')
      : '';
  }

  setAutoGeneratedKeyValue(pName: string): void {
    const chars = pName.replace(/[^a-zA-Z0-9]+/g, '');
    if (chars.length > 2) {
      this.projectKeyControl.setValue(chars.toUpperCase().substring(0, 5));
    }
  }

  onKeyUpProjectNameControl(): void {
    const pName = this.projectNameControl.value.toString();
    this.setAutoGeneratedKeyValue(pName);
  }
}
