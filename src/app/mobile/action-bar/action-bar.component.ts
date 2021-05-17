import {Component, Input, OnInit} from '@angular/core';
import {Application} from '@nativescript/core';
import {RadSideDrawer} from 'nativescript-ui-sidedrawer';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.tns.html',
  styleUrls: ['./action-bar.component.scss'],
  moduleId: module.id
})
export class ActionBarComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit(): void {

  }

  onDrawerButtonTap(): void {
    const sideDrawer = Application.getRootView() as RadSideDrawer;
    sideDrawer.showDrawer();
  }
}

