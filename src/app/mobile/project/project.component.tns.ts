import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import {Application, ItemEventData} from '@nativescript/core';

@Component({
  moduleId: module.id,
  selector: 'Project',
  templateUrl: './project.component.tns.html',
})
export class ProjectComponent implements OnInit {

  projects: { name: string, imageSrc: string }[] = [
    { name: 'New Prog', imageSrc: 'res://donut' },


    { name: 'New Prog', imageSrc: 'res://donut' },
    { name: 'New Prog', imageSrc: 'res://donut' },
    { name: 'New Prog', imageSrc: 'res://donut' },
    { name: 'New Prog', imageSrc: 'res://donut' },
    { name: 'New Prog', imageSrc: 'res://donut' },
  ];
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }
  onItemTap(args: ItemEventData): void {
    console.log('Item with index: ' + args.index + ' tapped');
  }

/*  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }*/
}
