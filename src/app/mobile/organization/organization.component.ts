import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import {Application, ItemEventData} from '@nativescript/core';

@Component({
  moduleId: module.id,
  selector: 'Organization',
  templateUrl: './organization.component.html',
})
export class OrganizationComponent implements OnInit {
  countries: { name: string, imageSrc: string }[] = [
    { name: 'New Org', imageSrc: 'res://donut' },


    { name: 'New Org', imageSrc: 'res://donut' },
    { name: 'New Org', imageSrc: 'res://donut' },
  ];
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = Application.getRootView() as RadSideDrawer;
    sideDrawer.showDrawer();
  }

  onItemTap(args: ItemEventData): void {
    console.log('Item with index: ' + args.index + ' tapped');
  }

  navigateAdd(): void  {
    // TODO Create org
  }
  onTouch(args): void {}

  onNavigate(): void {

  }

}
