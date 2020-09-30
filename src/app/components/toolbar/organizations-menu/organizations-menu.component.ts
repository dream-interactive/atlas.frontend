import {Component, OnInit} from '@angular/core';
import {Organization} from '../../../services/organization.service';
import {NavigationStart, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {filter, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-organizations-menu',
  templateUrl: './organizations-menu.component.html',
  styleUrls: ['./organizations-menu.component.scss']
})
export class OrganizationsMenuComponent implements OnInit {

  removeOrg: Organization = {
    image: '../../../assets/images/icon-business-pack/svg/101-laptop.svg', name: 'Remove'
  };
  orgs: Organization[] = [this.removeOrg];

  currentOrg: string;

  constructor(private router: Router, private translator: TranslateService) {

    const currentUrl = this.router.url;
    if (currentUrl.match(new RegExp('/o/'))) {
      const s = currentUrl.substring(3, currentUrl.length);
      const index = s.indexOf('/');
      if (index === -1) {
        this.setNameOfCurrentOrganization(s);
      } else {
        this.setNameOfCurrentOrganization(s.substring(0, index));
      }
    } else {
      this.getDefaultOrganizationNameFromTranslator(); // Get default value on first loa

      this.translator.onLangChange.pipe(
        mergeMap(() => this.translator.get(['navbar.dropdown.orgs']))
      ).subscribe(res => {
        this.currentOrg = res['navbar.dropdown.orgs'];
      }); // Get default value on lang change
    }

    router.events
      .pipe(
        filter((e) => e instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        const eventUrl = event.url;
        if (eventUrl.match(new RegExp('/o/'))) {
          const s = eventUrl.substring(3, eventUrl.length); // remove /o/
          const index = s.indexOf('/'); // find firs '/'
          if (index === -1) {
            this.setNameOfCurrentOrganization(s);
          } else {
            this.setNameOfCurrentOrganization(s.substring(0, index));
          }
        } else {
          this.getDefaultOrganizationNameFromTranslator();
        }
      });
  }

  ngOnInit(): void {
  }


  goTo(name: string): void {
    this.router.navigate([`/o/${name.toLowerCase()}`]);
  }

  goToStart(): void {
    this.router.navigate([`/start`]);
  }

  goToCreate(): void {
    this.router.navigate([`/new/organization`]);
  }

  setNameOfCurrentOrganization(route: string): void {
    const organizations = this.orgs
      .filter((org) => org.name.toLowerCase() === route);

    if (organizations) {
      this.currentOrg = organizations[0].name;
    }
    else {
      this.getDefaultOrganizationNameFromTranslator();
    }
  }

  getDefaultOrganizationNameFromTranslator(): void {
    this.translator.get(['navbar.dropdown.orgs']).subscribe((res) => {
      this.currentOrg = res['navbar.dropdown.orgs'];
    });
  }
}
