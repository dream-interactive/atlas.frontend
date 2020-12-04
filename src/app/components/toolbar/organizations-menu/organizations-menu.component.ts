import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {filter, mergeMap} from 'rxjs/operators';
import {Organization, OrganizationService} from '../../../services/organization.service';
import {OrganizationModalComponent} from '../../organization-modal/organization-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-organizations-menu',
  templateUrl: './organizations-menu.component.html',
  styleUrls: ['./organizations-menu.component.scss']
})
export class OrganizationsMenuComponent implements OnInit {

  organizations: Organization[] = [];

  currentOrg: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private translator: TranslateService,
              private dialog: MatDialog,
              private os: OrganizationService) {
  }

  ngOnInit(): void {
    this.os.userOrganizations$.subscribe((orgs) => {
      this.organizations = orgs;
      const currentUrl = this.router.url;

      if (currentUrl.match(new RegExp('/o/'))) {
        const orgName = this.route.children[0].snapshot.url[1].path; // organization is a second part in url
        this.setNameOfCurrentOrganization(orgName);
      } else {
        this.getDefaultOrganizationNameFromTranslator(); // Get default value on first load
      }

      this.router.events
        .pipe(
          filter((e) => e instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          const eventUrl = event.url;
          if (eventUrl.match(new RegExp('/o/'))) {
            const orgName = this.route.children[0].snapshot.url[1].path; // organization is a second part in url
            this.setNameOfCurrentOrganization(orgName);
          } else {
            this.getDefaultOrganizationNameFromTranslator();
          }
        });
    });

    this.translator.onLangChange.pipe(
      mergeMap(() => this.translator.get(['navbar.dropdown.orgs']))
    ).subscribe(res => {
      this.currentOrg = res['navbar.dropdown.orgs'];
    }); // Get default value on lang change

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

  setNameOfCurrentOrganization(route: string): void {
    const organizations = this.organizations
      .filter((org) => org.name.toLowerCase() === route);

    if (organizations.length > 0) {
      this.currentOrg = organizations[0].name;
    } else {
      // todo 404
      this.getDefaultOrganizationNameFromTranslator();
    }
  }

  getDefaultOrganizationNameFromTranslator(): void {
    this.translator.get(['navbar.dropdown.orgs']).subscribe((res) => {
      this.currentOrg = res['navbar.dropdown.orgs'];
    });
  }
}
