import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ItemEventData} from '@nativescript/core';
import {ModalDialogService} from '@nativescript/angular';
import {Organization, Project} from '@src/app/shared/atlas/entity.service';
import {OrganizationModalComponent} from '@src/app/mobile/organization/organization-modal/organization-modal.component';

@Component({
  moduleId: module.id,
  selector: 'app-organization',
  templateUrl: './organization.component.tns.html',
  styleUrls: ['./organization.component.tns.scss']
})
export class OrganizationComponent implements OnInit {

  organizations: Organization[] = [];

  user: {
    userid: string
  };


  loading = true;

  countries: { name: string, imageSrc: string }[] = [
    { name: 'New Org', imageSrc: 'res://donut' },


    { name: 'New Org', imageSrc: 'res://donut' },
    { name: 'New Org', imageSrc: 'res://donut' },
    { name: 'New Org', imageSrc: 'res://donut' },
    { name: 'New Org', imageSrc: 'res://donut' },
    { name: 'New Org', imageSrc: 'res://donut' },
  ];
  constructor(private modalDialog: ModalDialogService,
              private  vcRef: ViewContainerRef,
              ) {
    // Use the component constructor to inject providers.


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

  addOrg(): void {
    this.modalDialog.showModal(OrganizationModalComponent,
      {

        viewContainerRef: this.vcRef});
  }


  ngOnInit(): void {

  }



}
