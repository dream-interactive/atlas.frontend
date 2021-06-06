import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ItemEventData} from '@nativescript/core';
import {ModalDialogService} from '@nativescript/angular';
import {Organization } from '@src/app/shared/atlas/entity.service';
import {OrganizationModalComponent} from '@src/app/mobile/organization/organization-modal/organization-modal.component';
import {OrganizationService} from '@src/app/services/organization.service';
import {Subscription, zip} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  moduleId: module.id,
  selector: 'app-organization',
  templateUrl: './organization.component.tns.html',
  styleUrls: ['./organization.component.tns.scss']
})
export class OrganizationComponent implements OnInit, OnDestroy {

  organizations: Organization[] = [];
  private $usersOrganizations: Subscription = Subscription.EMPTY;

  user: {
    userId: '00u2v5jxvoGXWqQTw4x7'
  };


  loading = true;


  constructor(private modalDialog: ModalDialogService,
              private  vcRef: ViewContainerRef,
              private organizationService: OrganizationService
              ) {
    // Use the component constructor to inject providers.

    this.$usersOrganizations = this.organizationService.findAllByUserId('00u2v5jxvoGXWqQTw4x7')

      .subscribe((organizations) => {
        this.organizations = organizations;
        this.loading = false;

      }, error => this.loading = false);
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
  ngOnDestroy(): void {
    this.$usersOrganizations.unsubscribe();
  }


}
