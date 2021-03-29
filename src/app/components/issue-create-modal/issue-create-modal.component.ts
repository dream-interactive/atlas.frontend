import {Component, Inject, OnInit} from '@angular/core';
import {ProjectService} from '../../web/project/services/project.service';
import {FormControl, FormGroup} from '@angular/forms';
import {IssuePriorities, IssuesContainer} from '../../shared/atlas/entity.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IssuesContainerService} from '../../web/project/services/issues-container.service';
import {EMPTY, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface IssueCreateDialogData {
  container: IssuesContainer;
}

@Component({
  selector: 'app-issue-create-modal',
  templateUrl: './issue-create-modal.component.html',
  styleUrls: ['./issue-create-modal.component.scss']
})
export class IssueCreateModalComponent implements OnInit {

  container: IssuesContainer;
  containers: Observable<IssuesContainer[]> = EMPTY;

  issueForm: FormGroup;
  nameControl = new FormControl('');
  containerControl = new FormControl('');
  assignToControl  = new FormControl('');
  priorityControl = new FormControl(1);
  descriptionControl = new FormControl('');
  pointsControl = new FormControl('');
  labelsControl = new FormControl('');
  priorities = IssuePriorities;

  constructor(private projectService: ProjectService,
              private issuesContainerService: IssuesContainerService,
              @Inject(MAT_DIALOG_DATA) public data: IssueCreateDialogData) {
    this.issueForm = new FormGroup({
      nameControl: this.nameControl,
      containerControl: this.containerControl,
      priorityControl: this.priorityControl,
      pointsControl: this.pointsControl,
    });
  }

  ngOnInit(): void {
    this.container = this.data.container;
    this.containerControl.patchValue(this.data.container.idic);

    this.containers = this.issuesContainerService.issuesContainers$.pipe(
      startWith([]),
      map(containers => containers.sort((a: IssuesContainer, b: IssuesContainer) => a.indexNumber - b.indexNumber))
    );
  }

  create(): void {

  }
}
