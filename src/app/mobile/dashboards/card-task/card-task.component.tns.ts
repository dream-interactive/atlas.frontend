import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-task',
  templateUrl: './card-task.component.tns.html',
  styleUrls: ['./card-task.component.tns.scss']
})
export class CardTaskComponent implements OnInit {

  @Input() projectId: string;

  constructor() { }

  ngOnInit(): void {
  }


}
