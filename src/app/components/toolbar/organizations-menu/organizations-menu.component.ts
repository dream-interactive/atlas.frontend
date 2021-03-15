import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {filter, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {Organization, OrganizationService} from '../../../services/organization.service';
import {OrganizationModalComponent} from '../../organization-modal/organization-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {OktaAuthService} from '@okta/okta-angular';
import {from, Subscription} from 'rxjs';

@Component({
  selector: 'app-organizations-menu',
  templateUrl: './organizations-menu.component.html',
  styleUrls: ['./organizations-menu.component.scss']
})
export class OrganizationsMenuComponent implements OnInit, OnDestroy {

  organizations: Organization[] = [];

  currentOrg: Organization = this.setDefaultOrganizationData();

  private $organizations = Subscription.EMPTY;
  private $translator = Subscription.EMPTY;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private translator: TranslateService,
              private dialog: MatDialog,
              public auth: OktaAuthService,
              private organizationService: OrganizationService) {

    this.$organizations = from(auth.getUser()).pipe(
      switchMap((user) => {
          return this.organizationService.findAllByUserId(user.sub).pipe(
            switchMap((organizations) => {
              organizationService.updateOrganizationsSubject(organizations);
              return organizationService.userOrganizations$.pipe(
                mergeMap((orgs) => {
                  this.organizations = orgs;
                  return router.events.pipe(
                    filter((e) => e instanceof NavigationEnd),
                    startWith(router)
                  );
                })
              );
            })
          );
        }
      )
    ).subscribe((event: NavigationEnd) => {
      if (event.url.match(new RegExp('/o/'))) {
        const orgValidName = this.route.children[0].snapshot.url[1].path; // organization is a second part in url
        this.currentOrg = this.setOrganizationData(orgValidName);
      } else {
        this.currentOrg = this.setDefaultOrganizationData(); // set default value on first load
      }
    });
  }

  ngOnInit(): void {

    // Subscribe on lang change
    this.$translator = this.translator.onLangChange.subscribe(() => {
      if (!this.router.url.match(new RegExp('/o/([a-z0-9-])+/'))){
        this.currentOrg = this.setDefaultOrganizationData();
      }
    }); // Set default value on lang change
  }


  goTo(name: string): void {
    this.router.navigate([`/o/${name.toLowerCase()}`]);
  }

  goToOrgs(): void {
    this.router.navigate([`/start`]);
  }

  goToCreate(): void {
    this.dialog.open(OrganizationModalComponent, {
     // panelClass: ['full-screen-modal']
    });
  }

  private setOrganizationData(orgValidName: string): Organization {
    const organizations = this.organizations
      .filter((org) => org.validName === orgValidName);

    if (organizations.length > 0) {
      return organizations[0];
    } else {
      return this.setDefaultOrganizationData();
    }
  }

  private setDefaultOrganizationData(): Organization {
    const organization: Organization = {
      img: '', name: '', ownerUserId: '', validName: ''
    };

    organization.name = this.translator.instant('navbar.dropdown.orgs');
    organization.img = 'assets/images/icon-business-pack/svg/101-organization-4.svg';

    return organization;
  }

  ngOnDestroy(): void {
  }

}
