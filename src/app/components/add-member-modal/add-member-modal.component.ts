import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectMembersService} from '../../web/project/services/project-members.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Project} from '../../shared/atlas/entity.service';
import {map, switchMap} from 'rxjs/operators';

type DialogData = {
  project: Project;
};
@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.scss']
})
export class AddMemberModalComponent implements OnInit {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  form: FormGroup;

  constructor(private pms: ProjectMembersService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.form = new FormGroup({
        emailControl: this.emailControl
      }
    );
  }

  ngOnInit(): void {
  }

  getErrorMessage(): string {
    if (this.emailControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }

  addMember(): void {
    if (this.form.value) {
      this.pms.addMember(this.data.project.idp, this.emailControl.value).subscribe();
    }
  }
}
