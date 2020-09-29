import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Organization} from '../../../services/organization.service';
import {MatSelectChange} from '@angular/material/select';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-organizations-menu',
  templateUrl: './organizations-menu.component.html',
  styleUrls: ['./organizations-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationsMenuComponent implements OnInit {

  removeOrg: Organization = {
    image: '../../../assets/images/101-laptop.svg', name: 'Remove'
  };
  orgs: Organization[] = [this.removeOrg];

  currentOrg: string;

  constructor(private router: Router, private translator: TranslateService) {
    const currentUrl = this.router.url;
    console.log('navigationCu', this.currentOrg);

    if (currentUrl.match('/o/')) {
      const s = currentUrl.substring(4, currentUrl.length);
      const index = s.indexOf('/');

      this.currentOrg = s.substring(0, index);

      console.log('navigation', this.currentOrg);

    } else {

      this.translator.get(['navbar.dropdown.orgs']).subscribe(res => {
        this.currentOrg = res['navbar.dropdown.orgs']; // Get default value on first load
      });

      this.translator.onLangChange.pipe(
        mergeMap(() => this.translator.get(['navbar.dropdown.orgs']))
      ).subscribe(res => {
        this.currentOrg = res['navbar.dropdown.orgs'];
      }); // Get default value on lang change
    }




    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        const currentUrl2 = this.router.url;
        console.log('navigationCu', this.currentOrg);

        if (currentUrl2.match('/o/')) {
          const s = currentUrl2.substring(4, currentUrl2.length);
          const index = s.indexOf('/');

          this.currentOrg = s.substring(0, index);

          console.log('navigation', this.currentOrg);

        } else {

          this.translator.get(['navbar.dropdown.orgs']).subscribe(res => {
            this.currentOrg = res['navbar.dropdown.orgs']; // Get default value on first load
          });
        }
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
}
